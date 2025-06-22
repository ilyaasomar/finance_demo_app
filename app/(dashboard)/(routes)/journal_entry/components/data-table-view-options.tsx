"use client";

import { useEffect } from "react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  useEffect(() => {
    // Load column visibility from localStorage
    const storedVisibility = localStorage.getItem("columnVisibility");
    if (storedVisibility) {
      const visibilityMap = JSON.parse(storedVisibility);
      table.getAllColumns().forEach((column) => {
        const isVisible = visibilityMap[column.id] !== false;
        column.toggleVisibility(isVisible);
      });
    }
  }, [table]);

  const handleVisibilityChange = (columnId: string, isVisible: boolean) => {
    // Save the column visibility state to localStorage
    const visibilityMap = table.getAllColumns().reduce((acc, column) => {
      acc[column.id] = column.getIsVisible();
      return acc;
    }, {} as Record<string, boolean>);

    localStorage.setItem("columnVisibility", JSON.stringify(visibilityMap));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 flex">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                  handleVisibilityChange(column.id, !!value);
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
