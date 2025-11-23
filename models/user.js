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

    // ✅ Workout Progress
    completedDays: {
      type: [String],
      default: [],
    },

    // ✅ Calorie progress (date + calories)
    calorieProgress: {
      type: [
        {
          date: String,
          calories: Number,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema, "USERS");
