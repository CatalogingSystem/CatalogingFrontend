import { create } from "zustand";

interface DialogStore {
  isOpen: Record<string, boolean>;
  getDialogStatus: (dialogId: string) => boolean;
  setDialogStatus: (dialogId: string, status: boolean) => void;
  reset: () => void;
}

export const useDialogStore = create<DialogStore>((set, get) => ({
  isOpen: {},
  getDialogStatus: (dialogId: string) => {
    return get().isOpen[dialogId] || false;
  },
  setDialogStatus: (dialogId: string, status: boolean) => {
    set((state) => ({
      isOpen: { ...state.isOpen, [dialogId]: status },
    }));
  },
  reset: () => set({ isOpen: {} }),
}));
