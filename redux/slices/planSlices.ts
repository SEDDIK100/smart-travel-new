import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  rating: number;
  [key: string]: any;
}

// ✅ Added theme + themeKey so MyPlan and PlanDetails can use the plan's color theme
interface Plan {
  id: string;
  type: string;          // "trip" | "activity"
  status: string;        // "active" | "completed"
  title: string;
  tasks: Task[];
  overallRating: number;
  createdAt: string;
  theme?: string;        // trip plans  → key in THEMES (e.g. "adventures")
  themeKey?: string;     // activity plans → key in THEMES (e.g. "sport_fitness")
}

const planSlice = createSlice({
  name: "plans",
  initialState: { plans: [] as Plan[] },
  reducers: {
    setPlans: (state, action: PayloadAction<Plan[]>) => {
      state.plans = action.payload;
    },
    rateTask: (state, action: PayloadAction<{ planId: string; taskId: string; rating: number }>) => {
      const task = state.plans
        .find((p) => p.id === action.payload.planId)
        ?.tasks.find((t) => t.id === action.payload.taskId);
      if (task) task.rating = action.payload.rating;
    },
    completePlan: (state, action: PayloadAction<{ planId: string; rating: number }>) => {
      const plan = state.plans.find((p) => p.id === action.payload.planId);
      if (plan) {
        plan.status = "completed";
        plan.overallRating = action.payload.rating;
      }
    },
    removePlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((p) => p.id !== action.payload);
    },
    clearPlans: (state) => {
      state.plans = [];
    },
  },
});

export const { setPlans, rateTask, completePlan, removePlan, clearPlans } = planSlice.actions;
export default planSlice.reducer;
export type { Plan, Task };