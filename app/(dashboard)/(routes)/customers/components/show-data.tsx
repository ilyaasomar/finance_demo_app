import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/ui/header";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { styles } from "@/app/styles";
interface CustomerProps {
  data: any;
  user: boolean;
}
const CustomerData = ({ data, user }: CustomerProps) => {
  return (
    <div className="">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <Header title="Customers" />
          {user && (
            <Link href="/customers/create">
              <Button
                className={`flex gap-x-1 px-6 ${styles.primaryBgColor} text-white dark:bg-white hover:${styles.primaryColor}  dark:hover:bg-white`}
              >
                <Plus size={20} />
                Create
              </Button>
            </Link>
          )}
        </div>
        <DataTable data={data} columns={columns} searchKey="customer_name" />
      </div>
    </div>
  );
};

export default CustomerData;
