import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User as DbUser } from "@prisma/client";

export type AuthUser = SupabaseUser;
export type UserProfile = DbUser;

export interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (name: string, avatarUrl: string) => Promise<void>;
}

export type AuthContextType = AuthState & AuthActions;
