// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let isConnected = false;
let indexesCreated = false;

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected");

    // Create indexes only once
    if (!indexesCreated) {
      const db = mongoose.connection.db;
      // USERS index
      await db.collection("users").createIndex(
        { uid: 1, email: 1 },
        { unique: true, name: "uid_email_unique" }
      );
      // PROGRESS index
      await db.collection("progress").createIndex(
        { uid: 1, date: 1 },
        { unique: false, name: "uid_date_index" }
      );
      indexesCreated = true;
      console.log("✅ Indexes created");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
