import { create } from "zustand";

interface UIState {
  // Sidebar state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Add application modal
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;

  // Edit application modal
  editingApplicationId: string | null;
  openEditModal: (id: string) => void;
  closeEditModal: () => void;

  // View preference (kanban vs list)
  view: "kanban" | "list";
  setView: (view: "kanban" | "list") => void;

  // Currently dragging card (for drag and drop)
  draggingCardId: string | null;
  setDraggingCard: (id: string | null) => void;

  // Status change modal (shown after drag)
  statusChangeModal: {
    isOpen: boolean;
    applicationId: string | null;
    fromStatus: string | null;
    toStatus: string | null;
  };
  openStatusChangeModal: (
    applicationId: string,
    fromStatus: string,
    toStatus: string
  ) => void;
  closeStatusChangeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isSidebarOpen: true,
  isAddModalOpen: false,
  editingApplicationId: null,
  view: "kanban",
  draggingCardId: null,
  statusChangeModal: {
    isOpen: false,
    applicationId: null,
    fromStatus: null,
    toStatus: null,
  },

  // Actions
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  openEditModal: (id) => set({ editingApplicationId: id }),
  closeEditModal: () => set({ editingApplicationId: null }),

  setView: (view) => set({ view }),
  setDraggingCard: (id) => set({ draggingCardId: id }),

  openStatusChangeModal: (applicationId, fromStatus, toStatus) =>
    set({
      statusChangeModal: {
        isOpen: true,
        applicationId,
        fromStatus,
        toStatus,
      },
    }),
  closeStatusChangeModal: () =>
    set({
      statusChangeModal: {
        isOpen: false,
        applicationId: null,
        fromStatus: null,
        toStatus: null,
      },
    }),
}));
