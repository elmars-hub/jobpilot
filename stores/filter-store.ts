import { create } from "zustand";
import type { ApplicationStatus, LocationType } from "@/types";

interface FilterState {
  // Search query
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Status filter
  statusFilter: ApplicationStatus[];
  setStatusFilter: (statuses: ApplicationStatus[]) => void;
  toggleStatusFilter: (status: ApplicationStatus) => void;

  // Location type filter
  locationFilter: LocationType[];
  setLocationFilter: (locations: LocationType[]) => void;
  toggleLocationFilter: (location: LocationType) => void;

  // Salary range filter
  salaryRange: { min: number | null; max: number | null };
  setSalaryRange: (range: { min: number | null; max: number | null }) => void;

  // Date range filter
  dateRange: { from: Date | null; to: Date | null };
  setDateRange: (range: { from: Date | null; to: Date | null }) => void;

  // Reset all filters
  resetFilters: () => void;
}

const initialState = {
  searchQuery: "",
  statusFilter: [] as ApplicationStatus[],
  locationFilter: [] as LocationType[],
  salaryRange: { min: null, max: null },
  dateRange: { from: null, to: null },
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setStatusFilter: (statuses) => set({ statusFilter: statuses }),
  toggleStatusFilter: (status) =>
    set((state) => ({
      statusFilter: state.statusFilter.includes(status)
        ? state.statusFilter.filter((s) => s !== status)
        : [...state.statusFilter, status],
    })),

  setLocationFilter: (locations) => set({ locationFilter: locations }),
  toggleLocationFilter: (location) =>
    set((state) => ({
      locationFilter: state.locationFilter.includes(location)
        ? state.locationFilter.filter((l) => l !== location)
        : [...state.locationFilter, location],
    })),

  setSalaryRange: (range) => set({ salaryRange: range }),
  setDateRange: (range) => set({ dateRange: range }),

  resetFilters: () => set(initialState),
}));
