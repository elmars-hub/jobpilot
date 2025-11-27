import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: {
    template: "%s | JobPilot",
    default: "JobPilot",
  },
  description:
    "Sign in or create an account to start tracking your job applications with JobPilot.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
