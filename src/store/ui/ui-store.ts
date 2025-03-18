import { create } from "zustand";

interface State {
  isSidebarMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<State>((set) => ({
  isSidebarMenuOpen: false,
  openSideMenu: () => set({ isSidebarMenuOpen: true }),
  closeSideMenu: () => set({ isSidebarMenuOpen: false }),
}));
