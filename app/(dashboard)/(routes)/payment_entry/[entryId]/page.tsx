import React from "react";
import db from "@/lib/db";
import EntryForm from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
const EntryActionPage = async ({ params }: { params: { entryId: string } }) => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  let payment_entry: any = null;
  if (params.entryId !== "create") {
    payment_entry = await db.paymentEntry.findUnique({
      where: { id: params.entryId },
    });
  }

  const bank_account = await db.account.findMany({
    where: { user_id: userId },
  });
  const customer = await db.customer.findMany({ where: { user_id: userId } });
  const supplier = await db.supplier.findMany({ where: { user_id: userId } });

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <EntryForm
        initialData={payment_entry}
        customer={customer}
        supplier={supplier}
        bank_account={bank_account}
      />
    </div>
  );
};

export default EntryActionPage;
