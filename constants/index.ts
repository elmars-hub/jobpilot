import type { ApplicationStatus } from "@/types";

// Status configuration for the kanban board
export const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string; bgColor: string; order: number }
> = {
  WISHLIST: {
    label: "Wishlist",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    order: 0,
  },
  APPLIED: {
    label: "Applied",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    order: 1,
  },
  PHONE_SCREEN: {
    label: "Phone Screen",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    order: 2,
  },
  INTERVIEW: {
    label: "Interview",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    order: 3,
  },
  OFFER: {
    label: "Offer",
    color: "text-green-700",
    bgColor: "bg-green-100",
    order: 4,
  },
  REJECTED: {
    label: "Rejected",
    color: "text-red-700",
    bgColor: "bg-red-100",
    order: 5,
  },
  WITHDRAWN: {
    label: "Withdrawn",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    order: 6,
  },
};

// Kanban columns in order
export const KANBAN_COLUMNS: ApplicationStatus[] = [
  "WISHLIST",
  "APPLIED",
  "PHONE_SCREEN",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

// Location type options
export const LOCATION_TYPES = [
  { value: "REMOTE", label: "Remote" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ONSITE", label: "On-site" },
] as const;

// Timeline event icons (for reference)
export const TIMELINE_ICONS = {
  CREATED: "✨",
  STATUS_CHANGE: "🔄",
  NOTE_ADDED: "📝",
  REMINDER_SET: "⏰",
} as const;

// Navigation items for the sidebar
export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/applications", label: "Applications", icon: "Briefcase" },
  { href: "/analytics", label: "Analytics", icon: "BarChart3" },
  { href: "/reminders", label: "Reminders", icon: "Bell" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;
