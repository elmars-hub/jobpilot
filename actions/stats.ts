"use server";

import { prisma } from "@/lib/prisma";
import { ApplicationStatus } from "@prisma/client";

// =============================================================================
// STATS & ANALYTICS
// =============================================================================

export async function getApplicationStats(userId: string) {
  const [total, byStatus, thisWeek, upcomingReminders] = await Promise.all([
    prisma.application.count({ where: { userId } }),

    prisma.application.groupBy({
      by: ["status"],
      where: { userId },
      _count: { status: true },
    }),

    prisma.application.count({
      where: {
        userId,
        createdAt: {
          gte: getStartOfWeek(),
        },
      },
    }),

    prisma.reminder.findMany({
      where: {
        userId,
        isCompleted: false,
        dueDate: { gte: new Date() },
      },
      include: {
        application: { select: { company: true, jobTitle: true } },
      },
      orderBy: { dueDate: "asc" },
      take: 5,
    }),
  ]);

  const statusCounts = byStatus.reduce((acc, item) => {
    acc[item.status] = item._count.status;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  const responded =
    (statusCounts.PHONE_SCREEN || 0) +
    (statusCounts.INTERVIEW || 0) +
    (statusCounts.OFFER || 0) +
    (statusCounts.REJECTED || 0);

  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  return {
    total,
    statusCounts,
    thisWeek,
    responseRate,
    upcomingReminders,
  };
}

export async function getRecentActivity(userId: string, limit = 10) {
  const events = await prisma.timelineEvent.findMany({
    where: {
      application: { userId },
    },
    include: {
      application: { select: { company: true, jobTitle: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return events;
}

export async function getApplicationsOverTime(
  userId: string,
  days: number = 30
) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const applications = await prisma.application.findMany({
    where: {
      userId,
      createdAt: { gte: startDate },
    },
    select: {
      createdAt: true,
      status: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return applications;
}

export async function getStatusBreakdown(userId: string) {
  const breakdown = await prisma.application.groupBy({
    by: ["status"],
    where: { userId },
    _count: { status: true },
  });

  return breakdown.map((item) => ({
    status: item.status,
    count: item._count.status,
  }));
}

// =============================================================================
// HELPERS
// =============================================================================

function getStartOfWeek(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}
