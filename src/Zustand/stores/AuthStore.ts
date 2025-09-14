import { create } from "zustand";

interface AuthStore {
  jwt: string;
  login: (user: string) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  jwt: localStorage.getItem("jwt") || "",
  login: (user: string) => {
    set({ jwt: user });
    localStorage.setItem("jwt", user);
  },
  logout: () => {
    set({ jwt: "" });
    localStorage.removeItem("jwt");
  },
  reset: () => set({ jwt: "" }),
}));
