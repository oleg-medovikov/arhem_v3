import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  toggle(): void;
};

export const useSidebarState = create<SidebarState>((set) => ({
  isOpen: true,
  toggle() {
    set((prev) => ({ isOpen: !prev.isOpen }));
  },
}));
