"use client";
import PlanPage from "@/components/PlanPage";
import { yogaPlans } from "@/data/plansData";

export default function AdvancedYoga() {
  const { title, description, days } = yogaPlans.advanced;
  return <PlanPage title={title} description={description} days={days} type="yoga" />;
}
