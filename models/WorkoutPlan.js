import mongoose from "mongoose";

const WorkoutPlanSchema = new mongoose.Schema({
  level: { type: String, required: true },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      description: String,
    },
  ],
});

export default mongoose.models.WorkoutPlan ||
  mongoose.model("WorkoutPlan", WorkoutPlanSchema);
