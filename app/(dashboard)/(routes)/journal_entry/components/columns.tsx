"use client";

import { ColumnDef } from "@tanstack/react-table";

import Actions from "./actions";
export type EntryTransactionColumn = {
  id: string;
  entry_type: string;
  customer_id: string;
  supplier_id: string;
  customer_name: string;
  supplier_name: string;
  amount: number;
  customer_or_supplier_id: string;
  customer_or_supplier_name: string;
  account_id: string;
  account_name: string;
  description: string;
  registered_date: Date;
  createdAt: Date;
  updatedAt: Date;
};
export const columns: ColumnDef<EntryTransactionColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "id",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "Entry ID",
    // enableColumnFilter:{}
    meta: { show: false },
  },
  {
    accessorKey: "entry_type",
    header: "Type",
  },
  {
    accessorKey: "customer_id",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "Customer ID",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "supplier_id",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "Supplier ID",
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier Name",
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
    accessorKey: "account_name",
    header: "Account Name",
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
    cell: ({ row }) => <Actions entryId={row.original.id} />,
  },
];
