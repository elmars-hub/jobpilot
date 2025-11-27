"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// =============================================================================
// NOTES
// =============================================================================

export async function addNote(
  applicationId: string,
  userId: string,
  content: string
) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { userId: true, company: true },
  });

  if (!application || application.userId !== userId) {
    throw new Error("Application not found or access denied");
  }

  const note = await prisma.note.create({
    data: {
      applicationId,
      content,
    },
  });

  await prisma.timelineEvent.create({
    data: {
      applicationId,
      type: "NOTE_ADDED",
      content: `Added a note`,
    },
  });

  revalidatePath("/applications");

  return note;
}

/**
 * UPDATE NOTE
 */
export async function updateNote(
  noteId: string,
  userId: string,
  content: string
) {
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: { application: { select: { userId: true } } },
  });

  if (!note || note.application.userId !== userId) {
    throw new Error("Note not found or access denied");
  }

  const updated = await prisma.note.update({
    where: { id: noteId },
    data: { content },
  });

  revalidatePath("/applications");

  return updated;
}

export async function deleteNote(noteId: string, userId: string) {
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: { application: { select: { userId: true } } },
  });

  if (!note || note.application.userId !== userId) {
    throw new Error("Note not found or access denied");
  }

  await prisma.note.delete({ where: { id: noteId } });

  revalidatePath("/applications");

  return { success: true };
}
