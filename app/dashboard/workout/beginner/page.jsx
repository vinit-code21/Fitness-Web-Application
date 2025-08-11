"use client";
import PlanPage from "@/components/PlanPage";
import { workoutPlans } from "@/data/plansData";

export default function BeginnerWorkout() {
  const { title, description, days } = workoutPlans.beginner;
  return <PlanPage title={title} description={description} days={days} type="workout" />;
}
