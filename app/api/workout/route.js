import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

// ✅ Fetch workout plan (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const goal = (searchParams.get("goal") || "gain").toLowerCase();
    const level = (searchParams.get("level") || "beginner").toLowerCase();

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const workouts = db.collection("WORKOUTS");

    const planData = await workouts.findOne({
      goal: { $regex: new RegExp(`^${goal}$`, "i") },
      level: { $regex: new RegExp(`^${level}$`, "i") },
    });

    if (!planData) {
      return NextResponse.json(
        { success: false, message: "No workout plan found for your profile." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: {
        goal: planData.goal,
        level: planData.level,
        daysPerWeek: planData.daysPerWeek,
        plan: planData.plan,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching workout plan:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ Save completed workout day (POST)
export async function POST(req) {
  try {
    const { email, day } = await req.json();

    if (!email || !day) {
      return NextResponse.json({ success: false, error: "Email and day are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");

    // Add the completed day if not already marked
    const user = await users.findOne({ email });
    const completedDays = user?.completedDays || [];

    if (!completedDays.includes(day)) {
      completedDays.push(day);
      await users.updateOne(
        { email },
        { $set: { completedDays } },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true, message: `Marked ${day} as done!` });
  } catch (error) {
    console.error("❌ Error saving workout progress:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
