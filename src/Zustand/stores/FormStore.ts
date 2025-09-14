import { create } from "zustand";

interface FormStore {
  title: string;
  step: number;
  totalSteps: number;
  isEditMode: boolean;
  editRecord?: number;
  setTitle: (title: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setTotalSteps: (total: number) => void;
  setEditMode: (isEdit: boolean, record?: number) => void;
  reset: () => void;
}

export const useFormStore = create<FormStore>((set, get) => ({
  title: "",
  step: 0,
  totalSteps: 0,
  isEditMode: false,
  editRecord: undefined,
  setTitle: (title) => set({ title }),
  setStep: (step) => set({ step }),
  nextStep: () => {
    const current = get().step;
    const total = get().totalSteps;
    if (current < total - 1) set({ step: current + 1 });
  },
  previousStep: () => {
    const current = get().step;
    if (current > 0) set({ step: current - 1 });
  },
  setTotalSteps: (total) => set({ totalSteps: total }),
  setEditMode: (isEdit, record) =>
    set({ isEditMode: isEdit, editRecord: record }),
  reset: () => {
    set({
      title: "",
      step: 0,
      totalSteps: 0,
      isEditMode: false,
      editRecord: undefined,
    });
  },
}));
