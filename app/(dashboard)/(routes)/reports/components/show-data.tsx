"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/ui/header";
import { Account } from "@prisma/client";
import { columns } from "./columns";
import ReportForm from "./form";

interface ReportProps {
  data: any;
  account_data: Account[];
}
const ReportData = ({ account_data }: ReportProps) => {
  const [transactionData, setTransactions] = useState([]);

  const onConfirm = async (values: void) => {
    try {
      // @ts-ignore
      let formattedFromDate = new Date(values?.from_date);
      // @ts-ignore
      let formattedToDate = new Date(values.to_date);

      // Convert to UTC format
      formattedFromDate = new Date(formattedFromDate.toISOString());
      formattedToDate = new Date(formattedToDate.toISOString());

      if (formattedToDate < formattedFromDate) {
        toast.error("Incorrect Date");
      } else {
        const response = await axios.post("/api/reports", values);
        const transactions = response.data;
        setTransactions(transactions);
      }
    } catch (error: any) {
      toast.error(error?.response?.data);
    }
  };
  return (
    <div className="">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <Header title="Reports" />
        </div>
        {/* filter card */}
        <div className="flex flex-row items-center border w-full h-fit py-5">
          <ReportForm accountData={account_data} onSubmit={onConfirm} />
        </div>
        {transactionData && transactionData.length > 0 ? (
          <DataTable
            data={transactionData}
            columns={columns}
            searchKey="transaction_type"
          />
        ) : (
          <DataTable data={[]} columns={columns} searchKey="transaction_type" />
        )}
      </div>
    </div>
  );
};

export default ReportData;
