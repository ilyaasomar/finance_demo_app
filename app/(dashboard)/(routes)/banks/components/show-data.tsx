"use client";

import { DataTable } from "@/components/ui/data-table";
import { Account } from "@prisma/client";
import { columns } from "./columns";
import Header from "@/components/ui/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlignJustify, LayoutGrid, Plus } from "lucide-react";
import { styles } from "@/app/styles";
import BankAccounts from "./bank-cards";
import { useState } from "react";
interface BankDataProps {
  data: Account[];
}
const BankData = async ({ data }: BankDataProps) => {
  const [typeView, setTypedView] = useState<"card" | "datatable">("card");

  return (
    <div className="">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <Header title="Bank Accounts" />
          <Link href="/banks/create">
            <Button
              className={`flex gap-x-1 px-6 ${styles.primaryBgColor} text-white dark:bg-white hover:${styles.primaryColor}  dark:hover:bg-white`}
            >
              <Plus size={20} />
              Create
            </Button>
          </Link>
        </div>

        <div className="flex justify-end border-b pb-3 items-center space-x-2 border rounded-md p-4">
          <LayoutGrid
            size={30}
            className={`border-r-2 pr-1 cursor-pointer dark:text-white ${styles.primaryColor}`}
            onClick={() => setTypedView("card")}
          />
          <AlignJustify
            size={30}
            className={`border-r-2 pr-1 cursor-pointer dark:text-white ${styles.primaryColor}`}
            onClick={() => setTypedView("datatable")}
          />
        </div>
        {typeView === "card" ? (
          <BankAccounts bankData={data} />
        ) : (
          <DataTable columns={columns} data={data} searchKey="bank_name" />
        )}
      </div>
    </div>
  );
};

export default BankData;
