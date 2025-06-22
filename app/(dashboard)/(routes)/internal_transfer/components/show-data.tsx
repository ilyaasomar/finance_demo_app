import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import Header from "@/components/ui/header";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { styles } from "@/app/styles";
interface InternalTransferProps {
  data: any;
  accounts: any;
}
const InternalTransferData = ({ data, accounts }: InternalTransferProps) => {
  return (
    <div className="">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Header title="Internal Transfer" />
          <Link href="/internal_transfer/create">
            <Button
              className={`flex gap-x-1 px-6 ${styles.primaryBgColor} text-white dark:bg-white hover:${styles.primaryColor}  dark:hover:bg-white`}
            >
              <Plus size={20} />
              Create
            </Button>
          </Link>
        </div>
        <DataTable data={data} columns={columns} accounts={accounts} />
      </div>
    </div>
  );
};

export default InternalTransferData;
