"use client";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type CategoryColumn = {
  id: string;
  category_name: string;
  isAdmin: boolean;
  login_user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "category_name",
    header: "Name",
  },

  {
    id: "Options",
    cell: ({ row }) => <Actions categoryData={row.original} />,
  },
];
