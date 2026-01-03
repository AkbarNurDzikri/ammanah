"use client";

import { DataTableColumn } from "@/components/ui/data-table";
import type { Role } from "@prisma/client";
import { RoleActionsCell } from "./role-actions-cell";

export const getRoleColumns = (): DataTableColumn<Role>[] => [
  { key: "name", header: "Role Name", sortable: true },
  { key: "description", header: "Description" },
  {
    key: "actions",
    header: "Actions",
    render: (row) => <RoleActionsCell row={row} />,
  },
];
