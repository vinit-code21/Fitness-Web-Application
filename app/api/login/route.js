import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const { email, uid } = await req.json();
    const filePath = path.join(process.cwd(), "data", "users.json");
    let users = [];
    try {
      const txt = await fs.readFile(filePath, "utf8");
      users = JSON.parse(txt || "[]");
    } catch (err) {
      users = [];
    }

    const user = users.find((u) => (uid && u.uid === uid) || (email && u.email === email));
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const cookieValue = encodeURIComponent(JSON.stringify({ email: user.email, uid: user.uid }));
    const secure = process.env.NODE_ENV === "production";
    const cookie = `fitness_session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax;${secure ? " Secure;" : ""}`;

    return new Response(JSON.stringify(user), { status: 200, headers: { "Set-Cookie": cookie } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch user data" }), { status: 500 });
  }
}
