import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task { id: string; title: string; description: string; rating: number; [key: string]: any }
interface Plan { id: string; type: string; status: string; title: string; tasks: Task[]; overallRating: number; createdAt: string }

const planSlice = createSlice({
  name: "plans",
  initialState: { plans: [] as Plan[] },
  reducers: {
    setPlans: (state, action: PayloadAction<Plan[]>) => { state.plans = action.payload },
    rateTask: (state, action: PayloadAction<{ planId: string; taskId: string; rating: number }>) => {
      const task = state.plans.find(p => p.id === action.payload.planId)?.tasks.find(t => t.id === action.payload.taskId);
      if (task) task.rating = action.payload.rating;
    },
    completePlan: (state, action: PayloadAction<{ planId: string; rating: number }>) => {
      const plan = state.plans.find(p => p.id === action.payload.planId);
      if (plan) { plan.status = "completed"; plan.overallRating = action.payload.rating; }
    },
    clearPlans: (state) => { state.plans = []; },

  },
});

export const { setPlans, rateTask, completePlan, clearPlans } = planSlice.actions;
export default planSlice.reducer;
export type { Plan, Task };