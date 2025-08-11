"use client";
import PlanPage from "@/components/PlanPage";
import { dietPlans } from "@/data/plansData";

export default function GainDiet() {
  const { title, description, days } = dietPlans.gain;
  return <PlanPage title={title} description={description} days={days} type="diet" />;
}
