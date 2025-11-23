import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ success: false, error: "No message provided" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ✅ Supported model for generateContent
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ⚡ Fix: Pass as array of parts, not raw string
    const result = await model.generateContent([{ text: message }]);

    const reply = result.response.text();

    return NextResponse.json({ success: true, reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
