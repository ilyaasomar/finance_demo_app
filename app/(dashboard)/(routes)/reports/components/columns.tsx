"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type ReportColumn = {
  id: string;
  transaction_type: string;
  category_name: string;
  account_name: string;
  amount: number;
  debit: number;
  credit: number;
  balance: number;
  registered_date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<ReportColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "transaction_type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <>
          {row.original.transaction_type === "income" ? (
            <Badge className="bg-green-700 dark:bg-green-700 dark:text-white hover:bg-green-700 dark:hover:bg-green-700">
              {row.original.transaction_type}
            </Badge>
          ) : (
            <Badge className="bg-red-700 dark:bg-red-700 dark:text-white hover:bg-red-700 dark:hover:bg-red-700">
              {row.original.transaction_type}
            </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "category_name",
    header: "Category",
  },
  {
    accessorKey: "account_name",
    header: "Account",
  },
  {
    accessorKey: "debit",
    header: "Debit",
  },
  {
    accessorKey: "credit",
    header: "Credit",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "registered_date",
    header: "Date",
  },
];
