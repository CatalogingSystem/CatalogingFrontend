import { create } from "zustand";

type FormValueStore = {
  values: Record<string, any>;
  setValue: (field: string, value: any) => void;
  getValue: (field: string) => any;
  reset: () => void;
};

export const useFormValuesStore = create<FormValueStore>((set, get) => ({
  values: {},
  setValue: (field, value) => {
    set((state) => ({
      values: {
        ...state.values,
        [field]: value,
      },
    }));
  },
  getValue: (field) => {
    return get().values[field];
  },
  reset: () => {
    set(() => ({
      values: {},
    }));
  },
}));
