import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PermissionName } from "@/config/permissions";

interface AuthState {
  user: {
    id: string;
    email: string;
    name?: string | null;
    isSuperAdmin: boolean;
    permissions: string[];
    roles: string[];
  } | null;
  setAuth: (user: AuthState["user"]) => void;
  logout: () => void;
  hasPermission: (permission: PermissionName) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setAuth: (user) => set({ user }),
      logout: () => set({ user: null }),
      hasPermission: (permission) => {
        const user = get().user;
        if (!user) return false;
        if (user.isSuperAdmin) return true;
        return user.permissions.includes(permission);
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
