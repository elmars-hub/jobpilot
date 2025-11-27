import { ApplicationStatus } from "@prisma/client";

export type CreateApplicationInput = {
  company: string;
  jobTitle: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  locationType?: "REMOTE" | "HYBRID" | "ONSITE";
  status?: ApplicationStatus;
  contactName?: string;
  contactEmail?: string;
  contactLinkedIn?: string;
};

export type UpdateApplicationInput = Partial<CreateApplicationInput>;
