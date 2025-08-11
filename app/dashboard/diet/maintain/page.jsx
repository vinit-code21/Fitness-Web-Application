"use client";
import PlanPage from "@/components/PlanPage";
import { dietPlans } from "@/data/plansData";

export default function MaintainDiet() {
  const { title, description, days } = dietPlans.maintain;
  return <PlanPage title={title} description={description} days={days} type="diet" />;
}
