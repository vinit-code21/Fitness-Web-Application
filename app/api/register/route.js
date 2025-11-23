import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    console.log("🔹 API Hit: /api/register");

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");

    const body = await req.json();
    console.log("🔹 Received Body:", body);

    const {
      uid,
      name,
      email,
      password,
      age,
      weight,
      height,
      gender,
      activity, 
      mainGoal, 
      dietType,
      pushups,
    } = body;

    if (!uid || !name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existing = await users.findOne({ $or: [{ uid }, { email }] });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Prepare new user object
    const newUser = {
      uid: uid || `FIT${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
      gender,
      activityLevel: activity,
      weightGoal: mainGoal,
      mainGoal: mainGoal,
      dietType,
      pushups,
      createdAt: new Date(),
    };

    // ✅ Insert into MongoDB
    await users.insertOne(newUser);

    console.log(`✅ New user registered: ${email}`);
    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
