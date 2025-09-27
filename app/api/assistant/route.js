import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const finalPrompt = `
      You are a professional fitness, diet, and yoga trainer.
      Give advice in clear, simple language.
      User query: ${prompt}
    `;

    const result = await model.generateContent(finalPrompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
