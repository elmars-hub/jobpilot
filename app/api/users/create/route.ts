import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { User as PrismaUser } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!authUser.email) {
      return NextResponse.json({ error: "Email missing" }, { status: 400 });
    }

    const updates = {
      email: authUser.email,
      ...(authUser.user_metadata?.full_name && {
        name: authUser.user_metadata.full_name,
      }),
      ...(authUser.user_metadata?.avatar_url && {
        avatarUrl: authUser.user_metadata.avatar_url,
      }),
    };

    const user = await prisma.user.upsert({
      where: { id: authUser.id },
      update: updates,
      create: {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.full_name || null,
        avatarUrl: authUser.user_metadata?.avatar_url || null,
      },
    });

    return NextResponse.json<{ user: PrismaUser }>({ user });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
