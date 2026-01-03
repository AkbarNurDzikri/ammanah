"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedData } from "@/lib/datatable-server";
import { Card } from "@/components/ui/card";
import { DataTableProps } from "./types";
import { DataTableSearch } from "./data-table-search";
import { DataTableContent } from "./data-table-content";
import { DataTablePagination } from "./data-table-pagination";

export const DataTable = <T,>({
  model,
  columns,
  initialPageSize = 10,
  pageTitle,
  pageDescription,
  toolBar,
}: DataTableProps<T>) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["datatable", model, page, pageSize, sortBy, sortOrder, search],
    queryFn: () =>
      getPaginatedData(model, {
        page,
        pageSize,
        sortBy,
        sortOrder,
        search,
      }),
  });

  // Listen for global invalidation events for this specific model
  React.useEffect(() => {
    const handleInvalidate = (e: any) => {
      if (e.detail?.model === model) {
        refetch();
      }
    };
    window.addEventListener("datatable-invalidate", handleInvalidate);
    return () =>
      window.removeEventListener("datatable-invalidate", handleInvalidate);
  }, [model, refetch]);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 space-y-5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-emerald-600 dark:text-zinc-50 tracking-tighter">
            {pageTitle}
          </h1>
          <p className="text-emerald-500 dark:text-zinc-400 font-medium">
            {pageDescription}
          </p>
        </div>
        {isMounted && toolBar && toolBar}
      </div>

      <DataTableSearch search={search} onSearchChange={handleSearchChange} />

      <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
        <DataTableContent
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          isError={isError}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        <DataTablePagination
          page={page}
          pageSize={pageSize}
          total={data?.meta.total || 0}
          totalPages={data?.meta.totalPages || 0}
          onPageChange={setPage}
          setPageSize={setPageSize}
        />
      </Card>
    </div>
  );
};
