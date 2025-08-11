"use client";
import PlanPage from "@/components/PlanPage";
import { workoutPlans } from "@/data/plansData";

export default function AdvancedWorkout() {
  const { title, description, days } = workoutPlans.advanced;
  return <PlanPage title={title} description={description} days={days} type="workout" />;
}
