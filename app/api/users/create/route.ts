import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { User as PrismaUser } from "@prisma/client";
import { Prisma } from "@prisma/client";

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

    const existingUser = await prisma.user.findUnique({
      where: { email: authUser.email },
    });

    if (existingUser && existingUser.id !== authUser.id) {
      const user = await prisma.user.update({
        where: { email: authUser.email },
        data: {
          id: authUser.id,
          name: authUser.user_metadata?.full_name || existingUser.name,
          avatarUrl:
            authUser.user_metadata?.avatar_url || existingUser.avatarUrl,
        },
      });
      return NextResponse.json<{ user: PrismaUser }>({ user });
    }

    const user = await prisma.user.upsert({
      where: { id: authUser.id },
      update: {
        email: authUser.email,
        ...(authUser.user_metadata?.full_name && {
          name: authUser.user_metadata.full_name,
        }),
        ...(authUser.user_metadata?.avatar_url && {
          avatarUrl: authUser.user_metadata.avatar_url,
        }),
      },
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

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
