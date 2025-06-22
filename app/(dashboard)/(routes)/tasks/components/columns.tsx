"use client";
import { ColumnDef } from "@tanstack/react-table";

import Actions from "./action";
import { Badge } from "@/components/ui/badge";

export type TaskColumn = {
  id: string;
  subject: string;
  status: string;
  priority: string;
  description: string;
  expected_start_date: Date;
  expected_end_date: Date;
  createdAt: Date;
  updatedAt: Date;
};
export const columns: ColumnDef<TaskColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.status === "Open") {
        return (
          <Badge className="bg-orange-700 dark:bg-orange-700 dark:text-white hover:bg-orange-700 dark:hover:bg-orange-700">
            {row.original.status}
          </Badge>
        );
      } else if (row.original.status === "Working")
        return (
          <Badge className="bg-purple-700 dark:bg-purple-700 dark:text-white hover:bg-purple-700 dark:hover:bg-purple-700">
            {row.original.status}
          </Badge>
        );
      else {
        return (
          <Badge className="bg-blue-700 dark:bg-blue-700 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-700">
            {row.original.status}
          </Badge>
        );
      }
    },
  },

  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      if (row.original.priority === "Low") {
        return (
          <Badge className="bg-cyan-600 dark:bg-cyan-600 dark:text-white hover:bg-cyan-600 dark:hover:bg-cyan-600">
            {row.original.priority}
          </Badge>
        );
      } else if (row.original.priority === "Medium")
        return (
          <Badge className="bg-fuchsia-600 dark:bg-fuchsia-600 dark:text-white hover:bg-fuchsia-600 dark:hover:bg-fuchsia-600">
            {row.original.priority}
          </Badge>
        );
      else {
        return (
          <Badge className="bg-red-600 dark:bg-red-600 dark:text-white hover:bg-red-600 dark:hover:bg-red-600">
            {row.original.priority}
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "expected_start_date",
    header: "Start Date",
  },
  {
    accessorKey: "expected_end_date",
    header: "End Date",
  },
  {
    id: "options",
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
