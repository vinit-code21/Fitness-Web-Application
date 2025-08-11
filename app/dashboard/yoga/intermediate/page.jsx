"use client";
import PlanPage from "@/components/PlanPage";
import { yogaPlans } from "@/data/plansData";

export default function IntermediateYoga() {
  const { title, description, days } = yogaPlans.intermediate;
  return <PlanPage title={title} description={description} days={days} type="yoga" />;
}
