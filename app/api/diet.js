import { NextResponse } from "next/server";
import foodsData from "../../data/foods.json";

export async function POST(req) {
  try {
    const { goal, dietType } = await req.json();

    // Check API key
    const calorieKey = process.env.CALORIE_NINJAS_KEY;
    // If API key is not present, we'll fall back to a local dataset
    const useLocalFallback = !calorieKey;
    if (useLocalFallback) {
      console.warn("⚠️ CALORIE_NINJAS_KEY missing — falling back to local foods.json data");
      // Build a simple filtered meal list from foodsData
      const flat = Object.values(foodsData).flat();
      const filtered = flat.filter((m) => {
        const g = (goal || "").toLowerCase();
        const dt = (dietType || "").toLowerCase();
        let ok = true;
        if (g && g !== "both") ok = (m.goal || "").toLowerCase().includes(g);
        if (ok && dt) ok = (m.type || "").toLowerCase().includes(dt) || dt === "any";
        return ok;
      });

      return NextResponse.json({ success: true, meals: filtered.slice(0, 9), totalCalories: filtered.reduce((s, m) => s + (m.calories || 0), 0) });
    }

    // Build diet query
    let dietQuery = "";
    if (goal?.toLowerCase() === "build muscle") {
      dietQuery = "high protein diet";
    } else if (goal?.toLowerCase() === "weight loss") {
      dietQuery = "low calorie diet";
    } else {
      dietQuery = "balanced diet";
    }

    // Add veg / non-veg
    if (dietType?.toLowerCase() === "vegetarian") {
      dietQuery += " vegetarian";
    } else if (dietType?.toLowerCase() === "non-vegetarian") {
      dietQuery += " chicken fish eggs";
    }

    console.log(`📡 Fetching diet plan for query: "${dietQuery}"`);

    // Call CalorieNinjas
    const dietRes = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(dietQuery)}`,
      {
        headers: { "X-Api-Key": calorieKey },
        cache: "no-store",
      }
    );

    if (!dietRes.ok) {
      const errorText = await dietRes.text();
      console.error(`❌ API error: ${dietRes.status} - ${errorText}`);
      return NextResponse.json(
        { success: false, error: `Diet API error: ${dietRes.status}` },
        { status: dietRes.status }
      );
    }

    const dietData = await dietRes.json();
    console.log("✅ API response:", dietData);

    // Enrich external results with local data (images, recipes, youtube links) when possible
    const flatLocal = Object.values(foodsData).flat();
    const enriched = (dietData.items || []).map((it) => {
      // find best local match by name similarity (case-insensitive substring match)
      const name = (it.name || "").toLowerCase();
      const match = flatLocal.find((m) => {
        const localName = (m.name || "").toLowerCase();
        return localName && (name.includes(localName) || localName.includes(name));
      });
      if (match) {
        return {
          ...it,
          image: it.image || match.image,
          recipe: it.recipe || match.recipe,
          youtubeUrl: it.youtubeUrl || match.youtubeUrl,
        };
      }
      return it;
    });

    return NextResponse.json({
      success: true,
      meals: enriched,
      raw: dietData,
    });

  } catch (error) {
    console.error("🔥 Server error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
