import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // The SDK exposes a models() method to query available models
    const models = await genAI.listModels();

    return NextResponse.json({ success: true, models });
  } catch (err) {
    console.error("Error listing Gemini models:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
