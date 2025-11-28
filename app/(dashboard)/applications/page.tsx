"use client";

import { Briefcase } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-muted-foreground">
          Track and manage your job applications
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">No applications yet</h2>
        <p className="mt-2 text-muted-foreground max-w-md">
          Start tracking your job applications by adding your first one.
        </p>
      </div>
    </div>
  );
}
