import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

// ✅ GET: Fetch user details
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

    const user = await users.findOne({ email });

    if (!user) {
      console.log(`❌ No user found for email: ${email}`);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Create UID if missing
    if (!user.uid || user.uid.length > 10) {
      user.uid = `FIT${Math.floor(10000 + Math.random() * 90000)}`;
      await users.updateOne({ email }, { $set: { uid: user.uid } });
    }

    console.log(`✅ User fetched successfully: ${email}`);

    return NextResponse.json({
      success: true,
      user: {
        name: user.name || "",
        age: user.age || "",
        weight: user.weight || "",
        height: user.height || "",
        email: user.email || "",
        password: user.password || "",
        gender: user.gender || "",
        activityLevel: user.activityLevel || "",
        weightGoal: user.weightGoal || "",
        // persist any custom daily calorie goal set by user
        dailyGoal: user.dailyGoal || 2200,
        mainGoal: user.mainGoal || user.weightGoal || "",
        dietType: user.dietType || "",
        pushups: user.pushups || "",
        uid: user.uid || "",
        createdAt: user.createdAt || "",
        // ✅ Add this field so progress is loaded
        completedDays: user.completedDays || [],
      },
    });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update user details
export async function PUT(req) {
  try {
    const body = await req.json();
    const { email, ...updateData } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");

    const result = await users.updateOne(
      { email },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    console.log(`✅ User updated: ${email}`);
    return NextResponse.json({
      success: true,
      message: "User details updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
