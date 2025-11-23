// ✅ /app/api/progress/route.js
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

// ======================
// ✅ GET — Fetch progress
// ======================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");

    // Find user by email
    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Workout progress
    const completedDays = user.completedDays || [];

    // Determine user's goal/level to find the corresponding workout plan
    const goal = (user.mainGoal || user.weightGoal || "gain").toLowerCase();
    const level = (user.activity || user.level || "beginner").toLowerCase();

    const workouts = db.collection("WORKOUTS");
    const planData = await workouts.findOne({
      goal: { $regex: new RegExp(`^${goal}$`, "i") },
      level: { $regex: new RegExp(`^${level}$`, "i") },
    });

    // Default to 6 active days if plan not found
    let totalDays = 6;
    let completedCount = completedDays.length;

    if (planData) {
      const daysPerWeek = planData.daysPerWeek || (planData.plan?.length || 6);
      const activeDays = (planData.plan || []).filter((d) => !d.exercise?.toLowerCase().includes("rest")).slice(0, daysPerWeek);
      const activeNames = new Set(activeDays.map((d) => d.day));
      totalDays = activeDays.length || daysPerWeek || 6;
      // Count only completed days that belong to the active plan
      completedCount = (completedDays || []).filter((d) => activeNames.has(d)).length;
    }

    const workoutProgress = Math.min(Math.round((completedCount / Math.max(1, totalDays)) * 100), 100);

    // ✅ Diet (calorie) progress
    const today = new Date().toISOString().split("T")[0];
    const todayCalories =
      user.calorieProgress?.find((entry) => entry.date === today)?.calories || 0;

    const calorieGoal = user.calorieGoal || user.dailyGoal || 2000;
    const dietProgress = Math.min(
      Math.round((todayCalories / calorieGoal) * 100),
      100
    );

    return NextResponse.json({
      success: true,
      workoutProgress,
      dietProgress,
      completedDays,
      todayCalories,
      calorieGoal,
    });
  } catch (error) {
    console.error("❌ Error fetching progress:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// ======================
// ✅ POST — Update progress
// ======================
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, completedDays, calories } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");

    // Fetch user
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const today = new Date().toISOString().split("T")[0];
    const update = {};

    // ✅ Update completed workout days if provided
    if (Array.isArray(completedDays)) {
      update.completedDays = completedDays;
    }

    // ✅ Update or insert today's calorie data
    if (typeof calories === "number") {
      const existing = user.calorieProgress || [];
      const index = existing.findIndex((e) => e.date === today);

      if (index >= 0) {
        existing[index].calories = calories; // Update today's entry
      } else {
        existing.push({ date: today, calories }); // Add new entry
      }

      update.calorieProgress = existing;
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { success: false, message: "Nothing to update" },
        { status: 400 }
      );
    }

    await users.updateOne({ email }, { $set: update });

    return NextResponse.json({
      success: true,
      message: "Progress updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
