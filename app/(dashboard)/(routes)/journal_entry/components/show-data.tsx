import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import Header from "@/components/ui/header";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { styles } from "@/app/styles";
interface EntryProps {
  data: any;
  customers: any;
  suppliers: any;
  accounts: any;
}
const EntryData = ({ data, customers, suppliers, accounts }: EntryProps) => {
  return (
    <div className="">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Header title="Journal Entries" />
          <Link href="/journal_entry/create">
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
          customers={customers}
          suppliers={suppliers}
          accounts={accounts}
        />
      </div>
    </div>
  );
};

export default EntryData;
