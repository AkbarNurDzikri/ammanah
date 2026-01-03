import { useAuthStore } from "@/store/useAuthStore";
import { useLayoutStore } from "@/store/useLayoutStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { menuItems } from "../components/menu-item";
import { logoutAction } from "../actions/logout.action";

export function useSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();
  const { user, logout: logoutStore, hasPermission } = useAuthStore();
  const { isSidebarCollapsed, toggleSidebar } = useLayoutStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize dropdown state based on active children
  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.href && pathname === child.href
        );
        initialState[item.name] = hasActiveChild;
      }
    });
    setOpenDropdowns(initialState);
  }, [pathname]);

  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleLogout = async () => {
    await logoutAction();
    logoutStore();
    router.push("/login");
  };

  return {
    isMobileOpen,
    isMounted,
    openDropdowns,
    toggleDropdown,
    handleLogout,
    toggleSidebar,
    isSidebarCollapsed,
    setIsMobileOpen,
    user,
    hasPermission,
    pathname,
  };
}
