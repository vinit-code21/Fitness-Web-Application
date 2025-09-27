import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { goal, dietType } = await req.json();

    // Check API key
    const calorieKey = process.env.CALORIE_NINJAS_KEY;
    if (!calorieKey) {
      console.error("❌ Missing CALORIE_NINJAS_KEY in .env.local");
      return NextResponse.json(
        { success: false, error: "Server misconfiguration: API key missing" },
        { status: 500 }
      );
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

    return NextResponse.json({
      success: true,
      dietPlan: dietData.items || [],
    });

  } catch (error) {
    console.error("🔥 Server error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
