"use client";

import { Bell } from "lucide-react";

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reminders</h1>
        <p className="text-muted-foreground">Never miss a follow-up</p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">No reminders yet</h2>
        <p className="mt-2 text-muted-foreground max-w-md">
          Set reminders on your applications to stay on top of follow-ups.
        </p>
      </div>
    </div>
  );
}
