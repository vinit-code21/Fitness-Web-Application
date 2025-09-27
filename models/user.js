// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    weight: Number,
    height: Number,
    gender: String,
    activity: String,
    mainGoal: String,
    dietType: String,
    pushups: Number,
    suggestedPlans: Array, // Store plan IDs or objects
    progress: Array, // Store user progress updates
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
