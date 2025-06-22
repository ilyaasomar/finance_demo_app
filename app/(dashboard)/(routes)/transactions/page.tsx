import React from "react";
import TransactionData from "./components/show-data";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { formatter } from "@/lib/utils";

const TransactionPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  const transactions = await db.transaction.findMany({
    where: { user_id: userId },
    include: { accounts: true, categories: true },
    orderBy: { registered_date: "desc" },
  });

  const formattedTransactions: any = transactions.map((transaction, index) => {
    const myDate = new Date(transaction.registered_date);
    const formattedDate = myDate.toLocaleDateString();
    return {
      serialNumber: index + 1,
      id: transaction.id,
      transaction_type: transaction.transaction_type,
      category_id: transaction.categories.id,
      category_name: transaction.categories.category_name,
      amount: formatter.format(Number(transaction.amount)),
      account_id: transaction.accounts.id,
      account_number: transaction.accounts.account_number,
      bank_name: transaction.accounts.bank_name,
      description: transaction.description,
      registered_date: formattedDate,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  });

  // list categories
  const categories = await db.category.findMany({});
  const formattedCategory: any = categories.map((category) => ({
    value: category.id,
    label: category.category_name,
  }));

  // list accounts
  const accounts = await db.account.findMany({});
  const formattedAccount: any = accounts.map((account) => ({
    value: account.id,
    label: account.account_name,
  }));

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <TransactionData
        data={formattedTransactions}
        categories={formattedCategory}
        accounts={formattedAccount}
      />
    </div>
  );
};

export default TransactionPage;
