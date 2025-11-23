import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const users = db.collection("USERS");

    const { emailOrUid, password } = await req.json();

    if (!emailOrUid || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await users.findOne({
      $or: [{ email: emailOrUid }, { uid: emailOrUid }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { password: _, ...userData } = user;

    return NextResponse.json({
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    console.error("❌ Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
