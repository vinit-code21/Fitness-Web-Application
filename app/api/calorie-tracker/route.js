import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    if (!query) {
      return NextResponse.json({ success: false, error: "No food query provided" });
    }

    const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.CALORIE_NINJAS_API_KEY,
      },
    });

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("CalorieNinjas API error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch from CalorieNinjas API" });
  }
}

// ✅ Save calorie data (POST)
export async function POST(req) {
  try {
    const { email, calories } = await req.json();

    if (!email || !calories) {
      return NextResponse.json(
        { success: false, error: "Email and calories are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");

    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    const user = await users.findOne({ email });
    const progress = user?.calorieProgress || [];

    // Update if same date exists, else push new entry
    const existingIndex = progress.findIndex((p) => p.date === date);
    if (existingIndex !== -1) {
      progress[existingIndex].calories = calories;
    } else {
      progress.push({ date, calories });
    }

    await users.updateOne(
      { email },
      { $set: { calorieProgress: progress } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Calorie data saved successfully" });
  } catch (error) {
    console.error("❌ Error saving calorie data:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
