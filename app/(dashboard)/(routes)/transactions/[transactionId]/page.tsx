import React from "react";
import db from "@/lib/db";
import TransactionForm from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
const TransactionActionPage = async ({
  params,
}: {
  params: { transactionId: string };
}) => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  let transaction: any = null;
  if (params.transactionId !== "create") {
    transaction = await db.transaction.findUnique({
      where: { id: params.transactionId },
    });
  }

  const category = await db.category.findMany();
  const account = await db.account.findMany({ where: { user_id: userId } });

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <TransactionForm
        initialData={transaction}
        category={category}
        account={account}
      />
    </div>
  );
};

export default TransactionActionPage;
