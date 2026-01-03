import React from "react";
import { Search } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

interface DataTableSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const DataTableSearch = ({
  search,
  onSearchChange,
}: DataTableSearchProps) => {
  return (
    <Card className="rounded-2xl shadow-sm border-zinc-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-emerald-500 transition-all max-w-md">
      <CardHeader className="flex flex-row items-center gap-3 px-4 py-2 space-y-0">
        <Search size={20} className="text-zinc-400" />
        <input
          className="w-full bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </CardHeader>
    </Card>
  );
};
