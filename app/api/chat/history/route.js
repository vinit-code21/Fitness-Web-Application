import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").map((c) => c.trim()).reduce((acc, cur) => {
    const [k, v] = cur.split("=");
    acc[k] = v;
    return acc;
  }, {});
}

// GET: fetch saved chat messages for the logged-in user (from fitness_session cookie)
export async function GET(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parseCookies(cookieHeader);
    const session = cookies["fitness_session"];
    if (!session) return NextResponse.json({ success: false, messages: [] });

    let data;
    try {
      data = JSON.parse(decodeURIComponent(session));
    } catch (e) {
      return NextResponse.json({ success: false, messages: [] });
    }

    const email = data?.email || data?.uid || null;
    if (!email) return NextResponse.json({ success: false, messages: [] });

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const coll = db.collection("CHAT_MESSAGES");

    const docs = await coll.find({ email }).sort({ createdAt: 1 }).toArray();
    const messages = docs.map((d) => ({ role: d.role, text: d.text, createdAt: d.createdAt }));

    return NextResponse.json({ success: true, messages });
  } catch (err) {
    console.error("GET /api/chat/history error:", err);
    return NextResponse.json({ success: false, messages: [] }, { status: 500 });
  }
}

// POST: save one or more messages for the logged-in user. Body: { messages: [{role, text, meta?}, ...] }
export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body?.messages || [];
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: "No messages provided" }, { status: 400 });
    }

    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parseCookies(cookieHeader);
    const session = cookies["fitness_session"];
    if (!session) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

    let data;
    try {
      data = JSON.parse(decodeURIComponent(session));
    } catch (e) {
      return NextResponse.json({ success: false, error: "Invalid session" }, { status: 401 });
    }

    const email = data?.email || data?.uid || null;
    if (!email) return NextResponse.json({ success: false, error: "No user in session" }, { status: 401 });

    const client = await clientPromise;
    const db = client.db("FITNESSAPP");
    const coll = db.collection("CHAT_MESSAGES");

    const docs = messages.map((m) => ({
      email,
      role: m.role || "user",
      text: m.text || "",
      meta: m.meta || {},
      createdAt: new Date(),
    }));

    await coll.insertMany(docs);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/chat/history error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
