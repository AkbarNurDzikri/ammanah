import React from "react";
import { PrismaModelName } from "@/lib/datatable-server";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  model: PrismaModelName;
  columns: DataTableColumn<T>[];
  initialPageSize?: number;
  pageTitle: string;
  pageDescription?: string;
  toolBar?: React.ReactNode;
}
