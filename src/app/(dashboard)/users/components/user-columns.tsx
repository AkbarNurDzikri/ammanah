"use client";

import { DataTableColumn } from "@/components/ui/data-table";
import { User } from "@prisma/client";
import { UserActionsCell } from "./user-actions-cell";

export const getUserColumns = (): DataTableColumn<User>[] => [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  {
    key: "emailVerified",
    header: "Email Status",
    render: (row) => (
      <span
        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider ${
          row.emailVerified
            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
        }`}
      >
        {row.emailVerified ? "Verified" : "Pending"}
      </span>
    ),
  },
  {
    key: "isActive",
    header: "Account Status",
    render: (row) => (
      <span
        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider ${
          row.isActive
            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
        }`}
      >
        {row.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Joined At",
    sortable: true,
    render: (row) => (
      <span className="text-zinc-500 dark:text-zinc-400 font-medium">
        {new Date(row.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "roles" as any,
    header: "Roles",
    render: (row: any) => (
      <div className="flex items-center gap-1.5">
        <div className="px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-black">
          {row._count?.roles || 0}
        </div>
        <span className="text-xs text-zinc-500 font-bold tracking-tighter">
          Roles
        </span>
      </div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => <UserActionsCell row={row} />,
  },
];
