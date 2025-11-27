import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Get current authenticated user from Supabase
 * Returns null if not authenticated
 */
export async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Get current user with database profile
 * Redirects to login if not authenticated
 */
export async function getCurrentUser() {
  const authUser = await getAuthUser();

  if (!authUser) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
  });

  if (!user) {
    return prisma.user.create({
      data: {
        id: authUser.id,
        email: authUser.email!,
        name: authUser.user_metadata?.full_name,
        avatarUrl: authUser.user_metadata?.avatar_url,
      },
    });
  }

  return user;
}

/**
 * Get user with all their applications
 */
export async function getUserWithApplications() {
  const user = await getCurrentUser();

  return prisma.user.findUnique({
    where: { id: user.id },
    include: {
      applications: {
        include: {
          notes: true,
          tags: true,
          timeline: { orderBy: { createdAt: "desc" } },
        },
        orderBy: { updatedAt: "desc" },
      },
    },
  });
}
