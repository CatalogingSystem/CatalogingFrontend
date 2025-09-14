import { create } from "zustand";

interface SideBarItem {
  label: string;
  redirection: string;
}

type SideBarStore = {
  sideBarItems: SideBarItem[];
  tenantId?: string;
  setSideBarItems: (items: SideBarItem[]) => void;
  setTenantId: (tenantId: string) => void;
};

export const useSideBarStore = create<SideBarStore>((set) => ({
  sideBarItems: [],
  tenantId: localStorage.getItem("tenantId") || "",
  setSideBarItems: (items) => set({ sideBarItems: items }),
  setTenantId: (tenantId) => {
    localStorage.setItem("tenantId", tenantId);
    set({ tenantId });
  },
}));
