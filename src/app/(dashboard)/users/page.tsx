"use client";

import { DataTable } from "@/components/ui/data-table";
import { getUserColumns } from "./components/user-columns";

export default function UsersPage() {
  const columns = getUserColumns();

  return (
    <DataTable
      model="user"
      columns={columns}
      pageTitle="Users"
      pageDescription="Manage and monitor all registered users in the system."
    />
  );
}
