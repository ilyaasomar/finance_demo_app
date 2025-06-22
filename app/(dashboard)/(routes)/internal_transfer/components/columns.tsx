"use client";

import { ColumnDef } from "@tanstack/react-table";

import Actions from "./actions";
export type TransferColumn = {
  id: string;
  from_account: string;
  to_account: string;
  amount: number;
  registered_date: Date;
  createdAt: Date;
  updatedAt: Date;
};
export const columns: ColumnDef<TransferColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },

  {
    accessorKey: "from_account",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "From Account",
  },

  {
    accessorKey: "to_account",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "To Account",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },

  {
    accessorKey: "registered_date",
    header: "Date",
  },

  {
    header: "Options",
    cell: ({ row }) => <Actions transferId={row.original.id} />,
  },
];
