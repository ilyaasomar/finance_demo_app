"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";

interface CustomerProps {
  label: string;
  value: string;
}

interface SupplierProps {
  label: string;
  value: string;
}
interface AccountProps {
  label: string;
  value: string;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  customers: CustomerProps[];
  suppliers: SupplierProps[];
  accounts: AccountProps[];
}

export function DataTableToolbar<TData>({
  table,
  customers,
  suppliers,
  accounts,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Entry..."
          value={
            (table.getColumn("entry_type")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("entry_type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getColumn("customer_id") && (
          <DataTableFacetedFilter
            column={table.getColumn("customer_id")}
            title="Customer"
            options={customers}
          />
        )}
        {table.getColumn("supplier_id") && (
          <DataTableFacetedFilter
            column={table.getColumn("supplier_id")}
            title="Supplier"
            options={suppliers}
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
