"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthContextType, AuthUser, UserProfile } from "@/types/auth";
import axios, { AxiosError } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchProfile(token: string): Promise<UserProfile | null> {
  try {
    const res = await axios.get<{ authUser: AuthUser; profile: UserProfile }>(
      "/api/auth/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.profile;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const supabase = useMemo(() => createClient(), []);

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.access_token) return null;
      return fetchProfile(data.session.access_token);
    },
    enabled: !!user,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });

      if (!session?.user) {
        queryClient.removeQueries({ queryKey: ["profile"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, queryClient]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Invalid email or password");
      }
      throw error;
    }

    toast.success("Signed in successfully!");
    router.push("/dashboard");
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        throw new Error("An account with this email already exists");
      }
      throw error;
    }

    if (data.session?.access_token) {
      try {
        await axios.post("/api/users/create", null, {
          headers: { Authorization: `Bearer ${data.session.access_token}` },
        });
      } catch (err) {
        const axiosError = err as AxiosError<{ error: string }>;
        if (axiosError.response?.data?.error === "Email already exists") {
          throw new Error("An account with this email already exists");
        }
        throw err;
      }

      await supabase.auth.signOut();
      queryClient.removeQueries({ queryKey: ["auth-user"] });
      queryClient.removeQueries({ queryKey: ["profile"] });
    }

    toast.success("Account created successfully! Please sign in.");
    router.push("/login");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.removeQueries({ queryKey: ["auth-user"] });
    queryClient.removeQueries({ queryKey: ["profile"] });
    toast.success("Signed out successfully");
    router.push("/login");
  };

  const updateProfile = async (name: string, avatarUrl: string) => {
    if (!user) return;
    await axios.patch(`/api/user/${user.id}`, { name, avatarUrl });
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        profile: profile ?? null,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
