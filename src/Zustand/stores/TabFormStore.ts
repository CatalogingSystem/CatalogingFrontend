import { create } from "zustand";

type StepFormState = {
  step: number;
  updateStep: (value: number) => void;
  getStep: () => number;
  reset: () => void;
};

export const useStepFormStore = create<StepFormState>((set, get) => ({
  step: 0,
  updateStep: (value: number) =>
    set((state) => ({ step: value > 0 ? state.step + 1 : state.step - 1 })),
  getStep: () => get().step,
  reset: () => set({ step: 0 }),
}));

type TitleFormState = {
  title: string;
  updateTitle: (value: string) => void;
  getTitle: () => string;
};

export const useTitleFormStore = create<TitleFormState>((set, get) => ({
  title: "",
  updateTitle: (value) => set(() => ({ title: value })),
  getTitle: () => get().title,
  reset: () => set({ title: "" }),
}));
