"use client";
import { ColumnDef } from "@tanstack/react-table";

import Actions from "./action";

export type AccountColumn = {
  id: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  balance: number;
  user_id: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<AccountColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "account_name",
    header: "Account Name",
  },
  {
    accessorKey: "account_number",
    header: "Account Number",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    id: "options",
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
