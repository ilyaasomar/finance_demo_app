"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Header from "@/components/ui/header";
import { Account, Category } from "@prisma/client";
import ReportForm from "./form";
import { TableData } from "./table";

interface GeneralReportProps {
  account_data: Account[];
  category_data: Category[];
}
const ReportData = ({ account_data, category_data }: GeneralReportProps) => {
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
        console.log(values);

        const response = await axios.post("/api/reports/general", values);
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
          <ReportForm
            accountData={account_data}
            categoryData={category_data}
            onSubmit={onConfirm}
          />
        </div>
        {transactionData && transactionData.length > 0 ? (
          <TableData transData={transactionData} />
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </div>
  );
};

export default ReportData;
