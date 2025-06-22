import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/ui/header";
import { Users } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { styles } from "@/app/styles";
interface UseProps {
  data: Users[];
}
const UserData = ({ data }: UseProps) => {
  const isAdmin = data[0]?.isAdmin;

  return (
    <div className="">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <Header title="User" />
          {isAdmin && (
            <Link href="/transactions/create">
              <Button
               className={`flex gap-x-1 px-6 ${styles.primaryBgColor} text-white dark:bg-white hover:${styles.primaryColor}  dark:hover:bg-white`}
              >
                <Plus size={20} />
                Create
              </Button>
            </Link>
          )}
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
        <DataTable data={data} columns={columns} searchKey="fullname" />
      </div>
    </div>
  );
};

export default UserData;
