"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  categories: CategoryProps[];
  accounts: AccountProps[];
}

export function DataTableToolbar<TData>({
  table,
  categories,
  accounts,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter transaction..."
          value={
            (table.getColumn("transaction_type")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("transaction_type")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getColumn("category_id") && (
          <DataTableFacetedFilter
            column={table.getColumn("category_id")}
            title="Category"
            options={categories}
          />
        )}
        {table.getColumn("account_id") && (
          <DataTableFacetedFilter
            column={table.getColumn("account_id")}
            title="Account"
            options={accounts}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
