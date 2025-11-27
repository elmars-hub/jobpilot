"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// =============================================================================
// REMINDERS
// =============================================================================

export async function createReminder(
  applicationId: string,
  userId: string,
  dueDate: Date,
  note?: string
) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { userId: true },
  });

  if (!application || application.userId !== userId) {
    throw new Error("Application not found or access denied");
  }

  const reminder = await prisma.reminder.create({
    data: {
      userId,
      applicationId,
      dueDate,
      note,
    },
  });

  await prisma.timelineEvent.create({
    data: {
      applicationId,
      type: "REMINDER_SET",
      content: `Reminder set for ${dueDate.toLocaleDateString()}`,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/reminders");

  return reminder;
}

export async function completeReminder(reminderId: string, userId: string) {
  const reminder = await prisma.reminder.findUnique({
    where: { id: reminderId },
    select: { userId: true },
  });

  if (!reminder || reminder.userId !== userId) {
    throw new Error("Reminder not found or access denied");
  }

  const updated = await prisma.reminder.update({
    where: { id: reminderId },
    data: { isCompleted: true },
  });

  revalidatePath("/dashboard");
  revalidatePath("/reminders");

  return updated;
}

export async function deleteReminder(reminderId: string, userId: string) {
  const reminder = await prisma.reminder.findUnique({
    where: { id: reminderId },
    select: { userId: true },
  });

  if (!reminder || reminder.userId !== userId) {
    throw new Error("Reminder not found or access denied");
  }

  await prisma.reminder.delete({ where: { id: reminderId } });

  revalidatePath("/dashboard");
  revalidatePath("/reminders");

  return { success: true };
}

export async function getRemindersByUser(userId: string) {
  const reminders = await prisma.reminder.findMany({
    where: { userId },
    include: {
      application: {
        select: { company: true, jobTitle: true, status: true },
      },
    },
    orderBy: { dueDate: "asc" },
  });

  return reminders;
}

export async function getUpcomingReminders(userId: string, limit = 5) {
  const reminders = await prisma.reminder.findMany({
    where: {
      userId,
      isCompleted: false,
      dueDate: { gte: new Date() },
    },
    include: {
      application: { select: { company: true, jobTitle: true } },
    },
    orderBy: { dueDate: "asc" },
    take: limit,
  });

  return reminders;
}
