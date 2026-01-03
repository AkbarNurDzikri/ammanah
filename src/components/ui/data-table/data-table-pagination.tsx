import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const DataTablePagination = ({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  setPageSize,
}: DataTablePaginationProps) => {
  if (totalPages <= 0) return null;

  return (
    <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 pt-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Rows per page
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
              onPageChange(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px] hover:cursor-pointer">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="hover:cursor-pointer">
              {[5, 10, 25, 50, 100].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="hover:cursor-pointer"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          Showing{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {(page - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {Math.min(page * pageSize, total)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {total}
          </span>{" "}
          entries
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className="p-2 h-9 w-9"
        >
          <ChevronsLeft size={18} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 h-9 w-9"
        >
          <ChevronLeft size={18} />
        </Button>

        <div className="flex items-center gap-1 mx-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let p: number;
            if (totalPages <= 5) p = i + 1;
            else if (page <= 3) p = i + 1;
            else if (page >= totalPages - 2) p = totalPages - 4 + i;
            else p = page - 2 + i;

            return (
              <Button
                key={p}
                variant={page === p ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(p)}
                className={`w-9 h-9 text-sm font-semibold transition-all ${
                  page === p
                    ? "shadow-lg shadow-emerald-200 dark:shadow-none"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {p}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 h-9 w-9"
        >
          <ChevronRight size={18} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className="p-2 h-9 w-9"
        >
          <ChevronsRight size={18} />
        </Button>
      </div>
    </CardContent>
  );
};
