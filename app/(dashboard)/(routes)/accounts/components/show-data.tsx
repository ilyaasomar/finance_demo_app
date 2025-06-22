"use client";

import { DataTable } from "@/components/ui/data-table";
import { Account } from "@prisma/client";
import { columns } from "./columns";
import Header from "@/components/ui/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { styles } from "@/app/styles";
interface AccountDataProps {
  data: Account[];
}
const AccountData = async ({ data }: AccountDataProps) => {
  return (
    <div className="">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <Header title="Accounts" />
          <Link href="/accounts/create">
            <Button
              className={`flex gap-x-1 px-6 ${styles.primaryBgColor} text-white dark:bg-white hover:${styles.primaryColor}  dark:hover:bg-white`}
            >
              <Plus size={20} />
              Create
            </Button>
          </Link>
        </div>

        <DataTable columns={columns} data={data} searchKey="account_name" />
      </div>
    </div>
  );
};

export default AccountData;
