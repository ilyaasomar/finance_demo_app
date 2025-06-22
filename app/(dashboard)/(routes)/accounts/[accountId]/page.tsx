import React from "react";
import db from "@/lib/db";
import AccountForm from "./bank-form";

const AccountPage = async ({ params }: { params: { accountId: string } }) => {
  let account: any = null;
  if (params.accountId !== "create") {
    account = await db.facilityAccounts.findUnique({
      where: { id: params.accountId },
    });
  }

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <AccountForm initialData={account} />
    </div>
  );
};

export default AccountPage;
