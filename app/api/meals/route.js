// ✅ /app/api/meals/route.js
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const date = searchParams.get("date");

    if (!email || !date) {
      return NextResponse.json({ success: false, message: "Missing email or date" });
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const meals = db.collection("MEALS");

    const data = await meals.find({ userEmail: email, date }).toArray();
    return NextResponse.json({ success: true, meals: data });
  } catch (error) {
    console.error("❌ Error fetching meals:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, name, calories, quantity, category, date } = body;

    if (!userEmail || !name || !calories || !date) {
      return NextResponse.json({ success: false, message: "Missing fields" });
    }

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const meals = db.collection("MEALS");
    const users = db.collection("USERS");

    const meal = { userEmail, name, calories, quantity, category, date };
    const res = await meals.insertOne(meal);

    // ✅ Update calorieProgress for that day
    const todayEntry = await users.findOne({ email: userEmail });
    const currentProgress = todayEntry?.calorieProgress || [];
    const index = currentProgress.findIndex((entry) => entry.date === date);

    if (index >= 0) {
      currentProgress[index].calories += calories;
    } else {
      currentProgress.push({ date, calories });
    }

    await users.updateOne(
      { email: userEmail },
      { $set: { calorieProgress: currentProgress } }
    );

    return NextResponse.json({ success: true, meal: { ...meal, _id: res.insertedId } });
  } catch (error) {
    console.error("❌ Error adding meal:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, message: "Missing meal ID" });

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const meals = db.collection("MEALS");
    const users = db.collection("USERS");

    const meal = await meals.findOne({ _id: new ObjectId(id) });
    if (!meal) return NextResponse.json({ success: false, message: "Meal not found" });

    // Delete meal
    await meals.deleteOne({ _id: new ObjectId(id) });

    // ✅ Update calorieProgress
    const user = await users.findOne({ email: meal.userEmail });
    if (user) {
      const currentProgress = user.calorieProgress || [];
      const index = currentProgress.findIndex((entry) => entry.date === meal.date);

      if (index >= 0) {
        currentProgress[index].calories -= meal.calories;
        if (currentProgress[index].calories < 0) currentProgress[index].calories = 0;
      }

      await users.updateOne(
        { email: meal.userEmail },
        { $set: { calorieProgress: currentProgress } }
      );
    }

    return NextResponse.json({ success: true, message: "Meal deleted and calories updated" });
  } catch (error) {
    console.error("❌ Error deleting meal:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
