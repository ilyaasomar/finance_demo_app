import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import Header from "@/components/ui/header";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { styles } from "@/app/styles";
interface TransactionProps {
  data: any;
  categories: any;
  accounts: any;
}
const TransactionData = ({ data, categories, accounts }: TransactionProps) => {
  return (
    <div className="">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Header title="Transactions" />
          <Link href="/transactions/create">
            <Button
              className={`flex gap-x-1 px-6 ${styles.primaryBgColor} text-white dark:bg-white hover:${styles.primaryColor}  dark:hover:bg-white`}
            >
              <Plus size={20} />
              Create
            </Button>
          </Link>
        </div>
        <DataTable
          data={data}
          columns={columns}
          categories={categories}
          accounts={accounts}
        />
      </div>
    </div>
  );
};

export default TransactionData;
