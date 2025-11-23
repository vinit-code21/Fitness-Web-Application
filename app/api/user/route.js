// app/api/users/route.js
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

// ✅ Update daily goal
export async function PUT(req) {
  try {
    const { email, dailyGoal } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Missing email" });
    }

    // allow numeric 0 but require the field to be present
    if (dailyGoal === undefined || dailyGoal === null) {
      return NextResponse.json({ success: false, error: "Missing dailyGoal" });
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    // ensure we update the same collection other routes read from
    const usersCollection = db.collection("USERS");

    await usersCollection.updateOne(
      { email },
      { $set: { dailyGoal, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Goal updated" });
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" });
  }
}

// ✅ Fetch user (optional use)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, error: "Missing email" });
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user) return NextResponse.json({ success: false, error: "User not found" });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" });
  }
}
