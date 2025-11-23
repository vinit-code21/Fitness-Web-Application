import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

const COLLECTION_NAME = "user_meals";

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const collection = db.collection(COLLECTION_NAME);

    // Filter meals based on user preferences
    const filter = {
      ...(body.dietType ? { dietType: body.dietType.toLowerCase() } : {}),
      ...(body.weightGoal ? { goal: body.weightGoal.toLowerCase() } : {}),
    };

    // Fetch meals
    let meals = await collection
      .find(filter)
      .limit(Number(body.mealCount) || 3)
      .toArray();

    // No match → return random meals
    if (!meals || meals.length === 0) {
      meals = await collection
        .aggregate([{ $sample: { size: Number(body.mealCount) || 3 } }])
        .toArray();
    }

    if (!meals || meals.length === 0) {
      return NextResponse.json(
        { error: "No meals found. Please add meals in your database." },
        { status: 400 }
      );
    }

    // Build proper meal output
    const mealPlan = {
      userData: body,
      totalCalories:
        body.calories ||
        meals.reduce((sum, m) => sum + (m.calories || 0), 0),

      meals: meals.map((meal, index) => {
        const youtube = meal.youtubeUrl || meal.video || "";

        // Convert to embed format
        const embedUrl = youtube
          ? youtube.replace("watch?v=", "embed/")
          : null;

        return {
          type: meal.type || ["breakfast", "lunch", "dinner"][index] || "meal",
          title: meal.title || meal.name,
          description: meal.description || "Healthy meal",
          calories: meal.calories || 0,
          servings: meal.servings || 1,
          readyInMinutes: meal.readyInMinutes || 15,

          // Image
          image: meal.image || "/images/placeholder.svg",

          // Full recipe support
          ingredients: meal.ingredients || meal.recipe?.ingredients || [],
          steps: meal.steps || meal.recipe?.steps || [],
          recipe: meal.recipe || null,

          // YouTube
          youtubeUrl: youtube || null,
          youtubeEmbed: embedUrl || null,

          sourceUrl: meal.sourceUrl || "#"
        };
      }),
    };

    return NextResponse.json(mealPlan);

  } catch (err) {
    console.error("Meal Plan API Error:", err);
    return NextResponse.json(
      { error: "Something went wrong while generating meal plan." },
      { status: 500 }
    );
  }
}
