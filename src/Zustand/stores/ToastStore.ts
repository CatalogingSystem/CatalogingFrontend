import { create } from "zustand";

interface ToastStore {
  toast: Record<string, { id: string; onClose: () => void }>;
  setToast: (id: string, onClose: () => void) => void;
  removeToast: (id: string) => void;
  resetToast: () => void;
  executeToastOnClose: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: {},
  setToast: (id, onClose) =>
    set((state) => ({
      toast: {
        ...state.toast,
        [id]: {
          id,
          onClose: () => {
            onClose();
            set((currentState) => {
              const newToast = { ...currentState.toast };
              delete newToast[id];
              return { toast: newToast };
            });
          },
        },
      },
    })),
  removeToast: (id) =>
    set((state) => {
      const newToast = { ...state.toast };
      delete newToast[id];
      return { toast: newToast };
    }),
  resetToast: () => set({ toast: {} }),
  executeToastOnClose: (id) => {
    set((state) => {
      const toast = state.toast[id];
      if (toast) {
        toast.onClose();
      }
      return state;
    });
  },
}));
