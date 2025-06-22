import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import InternalTransferForm from "./form";
const InternalTransferPage = async ({
  params,
}: {
  params: { transferId: string };
}) => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  let internalTransfer: any = null;
  if (params.transferId !== "create") {
    internalTransfer = await db.internalTransfer.findUnique({
      where: { id: params.transferId },
    });
  }

  const account = await db.account.findMany({ where: { user_id: userId } });

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <InternalTransferForm initialData={internalTransfer} account={account} />
    </div>
  );
};

export default InternalTransferPage;
