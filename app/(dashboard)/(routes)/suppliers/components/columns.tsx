"use client";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type SupplierColumn = {
  id: string;
  supplier_name: string;
  phone: string;
  address: string;
  balance: string;
  isAdmin: boolean;
  login_user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<SupplierColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "supplier_name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Supplier Address",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },

  {
    id: "Options",
    cell: ({ row }) => <Actions customerData={row.original} />,
  },
];
