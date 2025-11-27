"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070"
          alt="Workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 left-8 flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-xl">✈️</span>
          </div>
          <span className="text-white font-semibold text-xl">JobPilot</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-12 left-8 right-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Land your dream job
          </h2>
          <p className="text-white/80">
            Track applications in just a few clicks.
            <br />
            Never miss an opportunity again.
          </p>
          <div className="flex gap-2 mt-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="h-2 rounded-full bg-white"
            />
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center p-6 lg:p-8"
        >
          <div className="flex items-center gap-2 lg:hidden">
            <span className="text-xl">✈️</span>
            <span className="font-semibold">JobPilot</span>
          </div>
          <div className="hidden lg:block" />
          <Link
            href={pathname === "/login" ? "/signup" : "/login"}
            className="px-6 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition"
          >
            {pathname === "/login" ? "Sign up" : "Sign in"}
          </Link>
        </motion.div>

        <div className="flex-1 flex items-center justify-center px-6 lg:px-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
