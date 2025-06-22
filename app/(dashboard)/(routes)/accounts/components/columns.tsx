"use client";
import { ColumnDef } from "@tanstack/react-table";

import Actions from "./action";

export type AccountColumn = {
  id: string;
  account_name: string;
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
    accessorKey: "account_name",
    header: "Account Name",
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
