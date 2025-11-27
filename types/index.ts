// Re-export Prisma types (will work after prisma generate)
// export type { Application, User, Note, Reminder, TimelineEvent, Tag, Resume } from "@prisma/client";

// Application status type
export type ApplicationStatus =
  | "WISHLIST"
  | "APPLIED"
  | "PHONE_SCREEN"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN";

// Location type
export type LocationType = "REMOTE" | "HYBRID" | "ONSITE";

// Timeline event type
export type TimelineEventType =
  | "CREATED"
  | "STATUS_CHANGE"
  | "NOTE_ADDED"
  | "REMINDER_SET";

// Application with relations
export interface ApplicationWithRelations {
  id: string;
  userId: string;
  company: string;
  companyLogo: string | null;
  jobTitle: string;
  jobUrl: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  location: string | null;
  locationType: LocationType;
  status: ApplicationStatus;
  contactName: string | null;
  contactEmail: string | null;
  contactLinkedIn: string | null;
  resumeId: string | null;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: NoteType[];
  reminders?: ReminderType[];
  timeline?: TimelineEventRecord[];
  tags?: TagType[];
}

// Note type
export interface NoteType {
  id: string;
  applicationId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Reminder type
export interface ReminderType {
  id: string;
  userId: string;
  applicationId: string;
  dueDate: Date;
  note: string | null;
  isCompleted: boolean;
  createdAt: Date;
}

// Timeline event record
export interface TimelineEventRecord {
  id: string;
  applicationId: string;
  type: TimelineEventType;
  content: string;
  createdAt: Date;
}

// Tag type
export interface TagType {
  id: string;
  name: string;
  color: string;
}

// User type
export interface UserType {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  weeklyGoal: number;
  createdAt: Date;
  updatedAt: Date;
}

// Form data types
export interface CreateApplicationData {
  company: string;
  jobTitle: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  locationType?: LocationType;
  status?: ApplicationStatus;
  contactName?: string;
  contactEmail?: string;
  contactLinkedIn?: string;
}

export interface UpdateApplicationData extends Partial<CreateApplicationData> {
  id: string;
}

// Kanban column type
export interface KanbanColumn {
  id: ApplicationStatus;
  title: string;
  applications: ApplicationWithRelations[];
}
