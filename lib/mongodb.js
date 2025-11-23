import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("⚠️ MONGODB_URI not found in .env.local");
}

// Log a sanitized host for debugging DNS issues (do not expose credentials)
try {
  const hostMatch = uri.match(/@?(.*?)(?:\/|\?|$)/);
  const host = hostMatch ? hostMatch[1] : "(unknown)";
  console.log(`🔎 MongoDB host (sanitized): ${host}`);
} catch (e) {
  // ignore
}

const options = {};
const client = new MongoClient(uri, options);
const clientPromise = client.connect();

clientPromise
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

export default clientPromise;
