import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").map(c => c.trim()).reduce((acc, cur) => {
    const [k,v] = cur.split("=");
    acc[k] = v;
    return acc;
  }, {});
}

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parseCookies(cookieHeader);
    const session = cookies['fitness_session'];
    if (!session) return NextResponse.json({ user: null });

    let data;
    try {
      data = JSON.parse(decodeURIComponent(session));
    } catch (e) {
      return NextResponse.json({ user: null });
    }

    // Lookup full user from file by uid or email
    const filePath = path.join(process.cwd(), "data", "users.json");
    let users = [];
    try {
      const txt = await fs.readFile(filePath, "utf8");
      users = JSON.parse(txt || "[]");
    } catch (err) {
      users = [];
    }

    const user = users.find(u => u.uid === data.uid || u.email === data.email) || null;
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
