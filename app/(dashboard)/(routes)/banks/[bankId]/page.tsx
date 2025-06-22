import React from "react";
import db from "@/lib/db";
import BankForm from "./bank-form";

const BanksPage = async ({ params }: { params: { bankId: string } }) => {
  let account: any = null;
  if (params.bankId !== "create") {
    account = await db.account.findUnique({
      where: { id: params.bankId },
    });
  }

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <BankForm initialData={account} />
    </div>
  );
};

export default BanksPage;
