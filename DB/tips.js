
//Tip sources:
//https://www.muscleandfitness.com/workouts/workout-tips/25-expert-tips-improve-workout/
//https://www.womenshealthmag.com/fitness/a38223093/best-fitness-tips/
const tips = [
    "Eat Slow-Digesting Carbs Before Workouts",
    "Avoid Higher-Fat Meals For Up to Four Hours Before Workouts",
    "Eat a Green Salad With Your Last Whole-Food Meal Before The Gym",
    "Take Whey Protein Supplements if you struggle with protein goals",
    "Take Caffeine 1-2 Hours Before Your Workout",
    "Use Forced Reps on Your Last Sets",
    "Don’t Train to Failure on Every Set",
    "Keep Your Focus on the Muscle You’re Training",
    "Listen to Music to Boost Your Focus",
    "Don’t Train Too Heavy For Too Long",
    "Save Cardio For After Your Weight Workout",
    "Use Wrist Straps For Your Pulling Exercises",
    "Start small",
    "Never skip your dynamic warm-ups",
    "Strength train at least twice a week",
    "Focus on form first",
    "Maintain good (sleep) hygiene",
    "Lean into active recovery days",
    "Stay hydrated",
    "Remember there's more than one right way to eat",
    "Aim to Eat 1.4– 2.2 grams of protein per kilogram of Body Weight Each Day"
];

export const getTip = () => {
    return tips[Math.floor(Math.random() * tips.length)];
}

