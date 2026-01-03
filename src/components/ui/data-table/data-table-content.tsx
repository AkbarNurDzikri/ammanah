import { ArrowDown, ArrowUp, ArrowUpDown, Loader2 } from "lucide-react";
import { DataTableColumn } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableContentProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading: boolean;
  isError: boolean;
  sortBy?: string;
  sortOrder: "asc" | "desc";
  onSort: (key: string) => void;
}

export const DataTableContent = <T,>({
  columns,
  data,
  isLoading,
  isError,
  sortBy,
  sortOrder,
  onSort,
}: DataTableContentProps<T>) => {
  const renderSortIcon = (key: string) => {
    if (sortBy !== key)
      return <ArrowUpDown size={14} className="text-zinc-400" />;
    return sortOrder === "asc" ? (
      <ArrowUp size={14} className="text-emerald-500" />
    ) : (
      <ArrowDown size={14} className="text-emerald-500" />
    );
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900/50 shadow-sm">
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
          <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                onClick={() => col.sortable && onSort(col.key)}
                className={`px-6 py-4 text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 h-auto ${
                  col.sortable
                    ? "cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {col.header}
                  {col.sortable && renderSortIcon(col.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 py-20 text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <Loader2
                    className="animate-spin text-emerald-500"
                    size={32}
                  />
                  <p className="text-zinc-500 text-sm">Loading data...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 py-20 text-center text-red-500 text-sm"
              >
                Failed to load data. Please try again.
              </TableCell>
            </TableRow>
          ) : data && data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 py-20 text-center text-zinc-500 text-sm"
              >
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row: any, i: number) => (
              <TableRow
                key={row.id || i}
                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors border-zinc-100 dark:border-zinc-800"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className="px-6 py-4 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
