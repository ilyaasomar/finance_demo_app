"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

interface CategoryProps {
  label: string;
  value: string;
}

interface AccountProps {
  label: string;
  value: string;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  accounts: AccountProps[];
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2"></div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
