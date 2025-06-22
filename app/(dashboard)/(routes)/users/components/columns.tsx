"use client";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type UserColumn = {
  id: string;
  fullname: string | null;
  email: string;
  password: string;
  isAdmin: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },

  {
    accessorKey: "fullname",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
  },

  {
    header: "Options",
    cell: ({ row }) => <Actions users={row.original} />,
  },
];
