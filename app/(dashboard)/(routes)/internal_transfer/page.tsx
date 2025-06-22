import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import InternalTransferData from "./components/show-data";

const InternalTransferPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  const internal_transfer = await db.internalTransfer.findMany({
    where: { user_id: userId },
    include: { fromAccount: true, toAccount: true },
    orderBy: { registered_date: "desc" },
  });

  const formattedTransfer: any = internal_transfer.map((transfer, index) => {
    const myDate = new Date(transfer.registered_date);
    const formattedDate = myDate.toLocaleDateString();
    return {
      serialNumber: index + 1,
      id: transfer.id,
      transfer_type: transfer.transfer_type,
      from_account: `${transfer.fromAccount?.bank_name} ## ${transfer.fromAccount?.account_number}`,
      to_account: `${transfer.toAccount?.bank_name} ## ${transfer.toAccount?.account_number}`,
      amount: formatter.format(Number(transfer.amount)),
      registered_date: formattedDate,
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
    };
  });

  // list accounts
  const accounts = await db.account.findMany({});
  const formattedAccount: any = accounts.map((account) => ({
    value: account.id,
    label: account.account_name,
  }));

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <InternalTransferData
        data={formattedTransfer}
        accounts={formattedAccount}
      />
    </div>
  );
};

export default InternalTransferPage;
