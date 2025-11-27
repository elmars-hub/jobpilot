import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold">JobPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign in
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4">
        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Track Your Job Search
            <br />
            <span className="text-primary">Like a Pro</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stop losing track of applications. See your entire job search
            pipeline in one beautiful dashboard. Never miss a follow-up again.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="py-20">
          <h2 className="text-center text-3xl font-bold">Why JobPilot?</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border p-6">
              <div className="text-3xl">📋</div>
              <h3 className="mt-4 font-semibold">Kanban Board</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop applications through stages like Trello.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <div className="text-3xl">⏰</div>
              <h3 className="mt-4 font-semibold">Smart Reminders</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Never forget to follow up. Set reminders for each application.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <div className="text-3xl">📊</div>
              <h3 className="mt-4 font-semibold">Analytics</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Track your response rate and see what&apos;s working.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <div className="text-3xl">📝</div>
              <h3 className="mt-4 font-semibold">Notes & Timeline</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep notes after interviews. See your full history.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold">Ready to land your dream job?</h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of job seekers who track smarter, not harder.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/signup">Start Tracking Free</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobPilot. Built for job seekers.
        </div>
      </footer>
    </div>
  );
}
