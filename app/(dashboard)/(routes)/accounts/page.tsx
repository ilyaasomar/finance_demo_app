import React from "react";
import AccountData from "./components/show-data";
import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
const BankPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  const accounts: any = await db.facilityAccounts.findMany({
    where: { user_id: userId },
  });
  const formattedAccount = accounts.map((account: any, index: number) => ({
    serialNumber: index + 1,
    id: account.id,
    account_name: account.account_name,
    balance: formatter.format(account?.balance),
    user_id: account.user_id,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  }));
  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <AccountData data={formattedAccount} />
    </div>
  );
};

export default BankPage;
