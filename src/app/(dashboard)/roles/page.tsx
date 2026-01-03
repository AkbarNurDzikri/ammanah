"use client";

import { DataTable } from "@/components/ui/data-table";
import { getRoleColumns } from "./components/role-columns";
import { useAuthStore } from "@/store/useAuthStore";
import { RoleCreateButton } from "./components/role-create-button";

export default function RolesPage() {
  const canCreateRole = useAuthStore((s) => s.hasPermission("role:create"));
  const columns = getRoleColumns();

  return (
    <DataTable
      model="role"
      columns={columns}
      pageTitle="Roles & Permissions"
      pageDescription="Define access control by assigning permissions to roles."
      toolBar={canCreateRole && <RoleCreateButton />}
    />
  );
}
