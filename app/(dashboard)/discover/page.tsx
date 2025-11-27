"use client";

import { Search } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">Discover Jobs</h1>
      <p className="mt-2 text-muted-foreground max-w-md">
        Find jobs tailored to your skills and experience. We&apos;re working on
        bringing you the best job listings from across the web.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        Coming Soon
      </div>
    </div>
  );
}
