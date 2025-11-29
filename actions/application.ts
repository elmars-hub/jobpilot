"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ApplicationStatus } from "@prisma/client";
import { CreateApplicationInput, UpdateApplicationInput } from "./types";

// =============================================================================
// APPLICATION CRUD
// =============================================================================

export async function getApplicationsByUser(userId: string) {
  const applications = await prisma.application.findMany({
    where: { userId },
    include: {
      tags: true,
      reminders: {
        where: { isCompleted: false },
        orderBy: { dueDate: "asc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return applications;
}

export async function getApplicationById(id: string, userId: string) {
  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      notes: { orderBy: { createdAt: "desc" } },
      timeline: { orderBy: { createdAt: "desc" } },
      reminders: { orderBy: { dueDate: "asc" } },
      tags: true,
      resume: true,
    },
  });

  if (!application || application.userId !== userId) {
    return null;
  }

  return application;
}

export async function createApplication(
  userId: string,
  input: CreateApplicationInput
) {
  const application = await prisma.application.create({
    data: {
      userId,
      company: input.company,
      jobTitle: input.jobTitle,
      jobUrl: input.jobUrl,
      salaryMin: input.salaryMin,
      salaryMax: input.salaryMax,
      location: input.location,
      locationType: input.locationType ?? "REMOTE",
      status: input.status ?? "APPLIED",
      contactName: input.contactName,
      contactEmail: input.contactEmail,
      contactLinkedIn: input.contactLinkedIn,
      timeline: {
        create: {
          type: "CREATED",
          content: `Added ${input.company} - ${input.jobTitle} to applications`,
        },
      },
    },
    include: { tags: true },
  });

  revalidatePath("/dashboard");
  revalidatePath("/applications");

  return application;
}

export async function updateApplication(
  id: string,
  userId: string,
  input: UpdateApplicationInput
) {
  const existing = await prisma.application.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Application not found or access denied");
  }

  const application = await prisma.application.update({
    where: { id },
    data: input,
    include: { tags: true },
  });

  revalidatePath("/dashboard");
  revalidatePath("/applications");

  return application;
}

export async function updateApplicationStatus(
  id: string,
  userId: string,
  newStatus: ApplicationStatus
) {
  const existing = await prisma.application.findUnique({
    where: { id },
    select: { userId: true, status: true, company: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Application not found or access denied");
  }

  if (existing.status === newStatus) {
    return prisma.application.findUnique({
      where: { id },
      include: { tags: true },
    });
  }

  const application = await prisma.application.update({
    where: { id },
    data: {
      status: newStatus,
      timeline: {
        create: {
          type: "STATUS_CHANGE",
          content: `Status changed from ${existing.status} to ${newStatus}`,
        },
      },
    },
    include: { tags: true },
  });

  revalidatePath("/dashboard");
  revalidatePath("/applications");

  return application;
}

export async function deleteApplication(id: string, userId: string) {
  const existing = await prisma.application.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Application not found or access denied");
  }

  await prisma.application.delete({ where: { id } });

  revalidatePath("/dashboard");
  revalidatePath("/applications");

  return { success: true };
}
