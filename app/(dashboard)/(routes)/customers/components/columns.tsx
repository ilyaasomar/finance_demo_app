"use client";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type CustomerColumn = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  balance: string;
  isAdmin: boolean;
  login_user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Customer Address",
  },
  {
    accessorKey: "balance",
    header: "Owed Balance",
  },

  {
    id: "Options",
    cell: ({ row }) => <Actions customerData={row.original} />,
  },
];
