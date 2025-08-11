"use client";
import PlanPage from "@/components/PlanPage";
import { dietPlans } from "@/data/plansData";

export default function LooseDiet() {
  const { title, description, days } = dietPlans.loose;
  return <PlanPage title={title} description={description} days={days} type="diet" />;
}
