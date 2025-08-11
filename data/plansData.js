// /data/plansData.js
export const workoutPlans = {
  beginner: {
    title: "Beginner Workout Plan",
    description:
      "Perfect for those starting out. Focuses on form, basic movements, and building a fitness foundation.",
    days: [
      { day: "Day 1", exercises: ["Push-ups - 3x10", "Bodyweight Squats - 3x12", "Plank - 3x30s"] },
      { day: "Day 2", exercises: ["Walking Lunges - 3x10 each leg", "Wall Sit - 3x30s", "Crunches - 3x15"] },
    ],
  },
  intermediate: {
    title: "Intermediate Workout Plan",
    description:
      "A balanced program with moderate intensity to improve strength, endurance, and mobility.",
    days: [
      { day: "Day 1", exercises: ["Pull-ups - 3x8", "Dumbbell Bench Press - 3x10", "Side Plank - 3x30s each side"] },
      { day: "Day 2", exercises: ["Deadlifts - 3x8", "Bulgarian Split Squats - 3x10 each leg", "Mountain Climbers - 3x20"] },
    ],
  },
  advanced: {
    title: "Advanced Workout Plan",
    description:
      "Challenging workouts for experienced individuals aiming for peak strength and conditioning.",
    days: [
      { day: "Day 1", exercises: ["Weighted Pull-ups - 4x6", "Barbell Squats - 4x6", "Hanging Leg Raises - 4x12"] },
      { day: "Day 2", exercises: ["Bench Press - 4x6", "Romanian Deadlifts - 4x8", "Pistol Squats - 3x8 each leg"] },
    ],
  },
};

export const yogaPlans = {
  beginner: {
    title: "Beginner Yoga Plan",
    description: "Gentle poses for flexibility, balance, and relaxation.",
    days: [
      { day: "Day 1", exercises: ["Mountain Pose - 1 min", "Child's Pose - 2 min", "Cat-Cow Stretch - 1 min"] },
      { day: "Day 2", exercises: ["Downward Dog - 1 min", "Seated Forward Bend - 1 min", "Bridge Pose - 1 min"] },
    ],
  },
  intermediate: {
    title: "Intermediate Yoga Plan",
    description: "A mix of strength, flexibility, and mindfulness.",
    days: [
      { day: "Day 1", exercises: ["Warrior I - 1 min", "Triangle Pose - 1 min", "Boat Pose - 1 min"] },
      { day: "Day 2", exercises: ["Crow Pose - 30s", "Half Moon Pose - 1 min", "Camel Pose - 1 min"] },
    ],
  },
  advanced: {
    title: "Advanced Yoga Plan",
    description: "Challenging flows for experienced practitioners.",
    days: [
      { day: "Day 1", exercises: ["Handstand - 30s", "Scorpion Pose - 30s", "King Pigeon Pose - 1 min"] },
      { day: "Day 2", exercises: ["Firefly Pose - 30s", "Eight Angle Pose - 30s", "Forearm Stand - 30s"] },
    ],
  },
};

export const dietPlans = {
  gain: {
    title: "Weight Gain Diet Plan",
    description: "High-calorie, nutrient-rich meals to help you gain muscle mass.",
    days: [
      { day: "Day 1", meals: ["Oatmeal with peanut butter", "Chicken and rice", "Greek yogurt with honey"] },
      { day: "Day 2", meals: ["Scrambled eggs & toast", "Beef stir-fry", "Protein shake with banana"] },
    ],
  },
  maintain: {
    title: "Maintenance Diet Plan",
    description: "Balanced meals to keep you healthy and energetic.",
    days: [
      { day: "Day 1", meals: ["Whole grain toast & avocado", "Grilled salmon with quinoa", "Mixed fruit salad"] },
      { day: "Day 2", meals: ["Egg omelet with spinach", "Turkey sandwich", "Vegetable soup"] },
    ],
  },
  loose: {
    title: "Weight Loss Diet Plan",
    description: "Low-calorie, high-protein meals to promote fat loss.",
    days: [
      { day: "Day 1", meals: ["Smoothie with spinach", "Grilled chicken salad", "Baked sweet potato"] },
      { day: "Day 2", meals: ["Boiled eggs & greens", "Tuna salad", "Steamed broccoli & fish"] },
    ],
  },
};
