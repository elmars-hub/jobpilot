"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Insights into your job search progress
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <BarChart3 className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">No data yet</h2>
        <p className="mt-2 text-muted-foreground max-w-md">
          Analytics will appear here once you start tracking applications.
        </p>
      </div>
    </div>
  );
}
