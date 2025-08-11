import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { askAI } from "@/lib/ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return Response.json({ error: "No prompt provided" }, { status: 400 });
    }
    const reply = await askAI(prompt);
    return Response.json({ reply });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to get AI reply" }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) return NextResponse.json({ error: "Prompt required" }, { status: 400 });

    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY in environment variables.");
      return NextResponse.json({ error: "Missing Gemini API key." }, { status: 500 });
    }

    let reply = "";
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      reply = result.response.text();
    } catch (aiError) {
      console.error("Gemini API error:", aiError);
      return NextResponse.json({ error: "Gemini API error", details: String(aiError) }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "API route error", details: String(error) }, { status: 500 });
  }
}
