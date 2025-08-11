"use client";
import PlanPage from "@/components/PlanPage";
import { yogaPlans } from "@/data/plansData";

export default function BeginnerYoga() {
  const { title, description, days } = yogaPlans.beginner;
  return <PlanPage title={title} description={description} days={days} type="yoga" />;
}
