"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import Actions from "./actions";
export type TransactionColumn = {
  id: string;
  transaction_type: string;
  category_id: string;
  category_name: string;
  amount: number;
  account_id: string;
  account_number: string;
  bank_name: string;
  registered_date: Date;
  createdAt: Date;
  updatedAt: Date;
};
export const columns: ColumnDef<TransactionColumn>[] = [
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
    accessorKey: "category_id",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "Category ID",
  },
  {
    accessorKey: "category_name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "account_id",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "Account ID",
  },
  {
    accessorKey: "account_number",
    header: "Account",
    cell: ({ row }) => {
      return `${row.original.bank_name} ## ${row.original.account_number} `;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "registered_date",
    header: "Date",
  },

  {
    header: "Options",
    cell: ({ row }) => <Actions transactionId={row.original.id} />,
  },
];
