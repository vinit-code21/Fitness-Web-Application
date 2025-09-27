// app/api/register/route.js
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  const body = await req.json();

  const userData = {
    uid: `local-${Date.now()}`,
    name: body.name,
    email: body.email,
    age: body.age ?? null,
    weight: body.weight ?? null,
    height: body.height ?? null,
    gender: body.gender ?? null,
    activity: body.activity ?? null,
    mainGoal: body.mainGoal ?? null,
    dietType: body.dietType ?? null,
    pushups: body.pushups ?? 0,
    suggestedPlans: body.suggestedPlans || [],
    progress: [],
    createdAt: new Date().toISOString(),
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "users.json");
    await fs.mkdir(dataDir, { recursive: true });

    let users = [];
    try {
      const txt = await fs.readFile(filePath, "utf8");
      users = JSON.parse(txt || "[]");
    } catch (err) {
      users = [];
    }

    // prevent duplicate by email
    if (users.find((u) => u.email === userData.email)) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    users.push(userData);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8");

    // Set HttpOnly cookie for session
    const cookieValue = encodeURIComponent(JSON.stringify({ email: userData.email, uid: userData.uid }));
    const secure = process.env.NODE_ENV === "production";
    const cookie = `fitness_session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax;${secure ? " Secure;" : ""}`;

    return new Response(JSON.stringify({ message: "User registered (file)", uid: userData.uid }), {
      status: 201,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to save user to file:", err);
    return new Response(JSON.stringify({ error: "Failed to save user" }), { status: 500 });
  }
}
