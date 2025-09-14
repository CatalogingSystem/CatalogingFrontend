import { create } from "zustand";

type FormValueStore = {
  values: Record<string, Record<string, any>>;
  setValue: (form: string, field: string, value: any) => void;
  getValue: (form: string, field: string) => any;
  reset: () => void;
  initializeFormValues: (form: string, data: Record<string, any>) => void;
};

export const useFormValuesStore = create<FormValueStore>((set, get) => ({
  values: {},

  setValue: (form, field, value) => {
    set((state) => ({
      values: {
        ...state.values,
        [form]: {
          ...state.values[form],
          [field]: value,
        },
      },
    }));
  },

  getValue: (form, field) => {
    return get().values[form]?.[field];
  },

  reset: () => {
    set(() => ({ values: {} }));
  },

  initializeFormValues: (form, data) => {
    set((state) => ({
      values: {
        ...state.values,
        [form]: { ...data },
      },
    }));
  },
}));
