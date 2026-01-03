import { PermissionName } from "@/config/permissions";
import { LucideIcon } from "lucide-react";

export interface MenuItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  permission?: PermissionName;
  children?: MenuItem[];
}
