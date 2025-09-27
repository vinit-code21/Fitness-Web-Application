// Minimal workout plans data used by the dashboard pages.
export const workoutPlans = {
  intermediate: {
    title: "Intermediate Workout Program",
    description: "A balanced intermediate program focusing on strength, hypertrophy and conditioning.",
    days: [
      {
        name: "Upper Body",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "6-8" },
          { name: "Bent-over Row", sets: 4, reps: "8-10" },
        ],
      },
      {
        name: "Lower Body",
        exercises: [
          { name: "Squat", sets: 4, reps: "6-8" },
          { name: "Romanian Deadlift", sets: 3, reps: "8-10" },
        ],
      },
    ],
  },
};
