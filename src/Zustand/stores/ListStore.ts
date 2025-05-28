import { create } from "zustand";

type ListStore = {
  refreshFunction: () => void;
  setRefreshFunction: (fun: () => void) => void;
  reset: () => void;
};

export const useListStore = create<ListStore>((set) => ({
  refreshFunction: () => {},
  setRefreshFunction: (fun) => set({ refreshFunction: fun }),
  reset: () => {},
}));
