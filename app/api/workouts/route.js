// /app/api/workouts/route.js
import { NextResponse } from "next/server";

const RAPIDAPI_HOST =
  process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "exercisedb.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") || "beginner";
  const equipment = searchParams.get("equipment") || "body weight";

  try {
    // Core body parts for 30-min full-body plan
    const bodyParts = [
      { name: "chest", display: "Chest" },
      { name: "back", display: "Back" },
      { name: "upper arms", display: "Arms" },
      { name: "shoulders", display: "Shoulders" },
      { name: "waist", display: "Core" },
      { name: "legs", display: "Legs" },
    ];

    // How many exercises per muscle group
    const perPart =
      level === "beginner" ? 1 : level === "intermediate" ? 2 : 2;

    // Sets & reps depending on level
    const sets = level === "beginner" ? 3 : level === "intermediate" ? 4 : 5;
    const reps =
      level === "beginner"
        ? "10-12"
        : level === "intermediate"
        ? "10-15"
        : "8-12";

    const promises = bodyParts.map(async (part) => {
      const res = await fetch(
        `https://${RAPIDAPI_HOST}/exercises/bodyPart/${encodeURIComponent(
          part.name
        )}`,
        {
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
          },
          cache: "no-store",
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error(`❌ Failed to parse JSON for ${part.name}`, err);
        return [];
      }

      if (!Array.isArray(data)) {
        console.error(`❌ API error for ${part.name}:`, data);
        return [];
      }

      // Filter by equipment
      let filtered = data.filter((e) =>
        e.equipment?.toLowerCase().includes(equipment.toLowerCase())
      );
      if (filtered.length === 0) filtered = data;

      // Pick first N exercises
      return filtered.slice(0, perPart).map((ex) => ({
        id: ex.id,
        name: ex.name,
        bodyPart: part.display,
        equipment: ex.equipment,
        gifUrl: ex.gifUrl,
        sets,
        reps,
        duration: `${Math.round(sets * 1.5)}-min`, // ~1.5min per set
      }));
    });

    const result = (await Promise.all(promises)).flat();

    return NextResponse.json({
      level,
      equipment,
      duration: "~30 min",
      workouts: result,
    });
  } catch (err) {
    console.error("❌ API Route Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch workouts" },
      { status: 500 }
    );
  }
}
