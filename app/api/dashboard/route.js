import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

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

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");
    const meals = db.collection("MEALS");

    // 🧠 Fetch user progress
    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Workout progress
    const completedDays = user.completedDays || [];
    const totalDays = 5; // based on beginner plan
    const progressPercent = Math.round((completedDays.length / totalDays) * 100);

    // ✅ Calorie intake and progress (last 7 days)
    // Build last 7 date keys
    const today = new Date();
    const last7 = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      last7.push(d.toISOString().split("T")[0]);
    }

    // Aggregate meals by date for these last 7 days
    const mealsCursor = await meals
      .aggregate([
        { $match: { userEmail: email, date: { $in: last7 } } },
        {
          $group: {
            _id: "$date",
            totalCalories: { $sum: "$calories" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const mealsByDate = mealsCursor.reduce((acc, m) => {
      acc[m._id] = m.totalCalories;
      return acc;
    }, {});

    // Build progress array expected by frontend: date, workoutsCompleted (0/1), caloriesBurned (0 for now), caloriesIntake
    const progress = last7.map((dateKey) => {
      // determine weekday name for this dateKey (e.g., 'Monday')
      const dt = new Date(dateKey + "T00:00:00");
      const weekday = dt.toLocaleDateString("en-US", { weekday: "long" });
      const workoutsCompleted = completedDays.includes(weekday) ? 1 : 0;
      return {
        date: dateKey,
        workoutsCompleted,
        caloriesBurned: 0,
        caloriesIntake: mealsByDate[dateKey] || 0,
      };
    });

    const caloriesByDay = progress.map((p) => ({ date: p.date, calories: p.caloriesIntake }));

    // ✅ Return combined data
    return NextResponse.json({
      success: true,
      data: {
        name: user.name,
        completedDays,
        progressPercent,
        caloriesByDay,
        workoutsCompleted: completedDays.length,
        progress,
      },
    });
  } catch (error) {
    console.error("❌ Dashboard fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
