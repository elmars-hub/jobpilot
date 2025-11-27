"use client";

import { useAuth } from "@/context/authContext";

export default function DashboardPage() {
  const { user, profile, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">JobPilot</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {profile?.name}
            </span>
            <button
              onClick={signOut}
              className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Welcome, {profile?.name || "there"}!
          </h2>
          <p className="mt-1 text-muted-foreground">
            Your job application dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Applications
            </h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Interviews
            </h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Offers
            </h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h3 className="font-medium">Profile Info</h3>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">User ID:</span> {user?.id}
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span>{" "}
              {user?.email}
            </p>
            <p>
              <span className="text-muted-foreground">Name:</span>{" "}
              {profile?.name || "Not set"}
            </p>
            <p>
              <span className="text-muted-foreground">Weekly Goal:</span>{" "}
              {profile?.weeklyGoal || 10} applications
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
