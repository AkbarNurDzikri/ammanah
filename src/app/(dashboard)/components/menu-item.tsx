import { MenuItem } from "@/types/nav";
import {
  LayoutDashboard,
  Database,
  ShieldCheck,
  Users,
  Settings,
  MapPin,
  Home,
  User,
  UsersRound,
} from "lucide-react";

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard:read",
  },
  {
    name: "Master",
    icon: Database,
    children: [
      {
        name: "Users",
        href: "/users",
        icon: Users,
        permission: "user:read",
      },
      {
        name: "Roles",
        href: "/roles",
        icon: ShieldCheck,
        permission: "role:read",
      },
    ],
  },
  {
    name: "Kependudukan",
    icon: Users,
    children: [
      {
        name: "Dashboard",
        href: "/kependudukan",
        icon: LayoutDashboard,
        permission: "dashboardKependudukan:read",
      },
      {
        name: "Gang",
        href: "/kependudukan/gang",
        icon: MapPin,
        permission: "gang:read",
      },
      {
        name: "Rumah",
        href: "/kependudukan/rumah",
        icon: Home,
        permission: "rumah:read",
      },
      {
        name: "Kartu Keluarga",
        href: "/kependudukan/kk",
        icon: Database,
        permission: "kk:read",
      },
      {
        name: "Penduduk",
        href: "/kependudukan/penduduk",
        icon: UsersRound,
        permission: "penduduk:read",
      },
      {
        name: "Riwayat Mutasi",
        href: "/kependudukan/mutasi",
        icon: Database, // Will change icon if needed
        permission: "mutasi:read",
      },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    permission: "dashboard:read", // Assuming standard access for settings
  },
];
