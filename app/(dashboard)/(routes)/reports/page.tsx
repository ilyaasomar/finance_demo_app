import React from "react";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import ReportData from "./components/show-data";
import { formatter } from "@/lib/utils";

const ReportPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  const userAccount = await db.account.findMany({
    where: { user_id: userId },
  });

  const transactions = await db.transaction.findMany({
    where: { user_id: userId },
    include: { accounts: true, categories: true },
    orderBy: { registered_date: "asc" },
  });

  const formattedTransactions: any = [];
  let newBalance: number = 0;

  for (const transaction of transactions) {
    const myDate = new Date(transaction.registered_date);
    const formattedDate = myDate.toLocaleDateString();

    if (transaction.transaction_type === "income") {
      newBalance += transaction.amount;
    } else if (transaction.transaction_type === "expense") {
      newBalance -= transaction.amount;
    }

    formattedTransactions.push({
      id: transaction.id,
      transaction_type: transaction.transaction_type,
      category_name: transaction.categories.category_name,
      amount: formatter.format(Number(transaction.amount)),
      debit: `$ ${
        transaction.transaction_type === "income" ? transaction.amount : 0
      }`,
      credit: `$ ${
        transaction.transaction_type === "expense" ? transaction.amount : 0
      }`,
      balance: newBalance,
      account_id: transaction.accounts.bank_name,
      registered_date: formattedDate,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });
  }

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col space-y-5">
        <ReportData data={formattedTransactions} account_data={userAccount} />
      </div>
    </div>
  );
};

export default ReportPage;
