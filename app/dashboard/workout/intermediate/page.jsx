"use client";
import PlanPage from "@/components/PlanPage";
import { workoutPlans } from "@/data/plansData";

export default function IntermediateWorkout() {
  const { title, description, days } = workoutPlans.intermediate;
  return <PlanPage title={title} description={description} days={days} type="workout" />;
}
