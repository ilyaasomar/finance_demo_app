import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Cards from "./components/cards";
import CardDetails from "./components/show-cards";

const Dashbaord = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user.id;
  //   select account from database
  const accounts = await db.account.findMany({ where: { user_id: userId } });
  // select all transactions belongs to this user
  const incomeTransactions = await db.transaction.findMany({
    where: {
      user_id: userId,
      transaction_type: "income",
      NOT: {
        categories: { category_name: "Internal Transfer" },
      },
    },
  });
  const expenseTransactions = await db.transaction.findMany({
    where: {
      user_id: userId,
      transaction_type: "expense",
      NOT: {
        categories: { category_name: "Internal Transfer" },
      },
    },
  });
  //   get sum of all accounts balance
  let balance: number = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );
  //   get sum of all income transactions
  let income: number = incomeTransactions.reduce(
    (total, balance) => total + balance.amount,
    0
  );

  //   get sum of all expense transactions
  let expense: number = expenseTransactions.reduce(
    (total, balance) => total + balance.amount,
    0
  );

  return (
    <>
      <div className="mt-5">
        {/* container */}
        <div className="flex flex-col gap-y-10">
          {/* top bart */}
          <Cards income={income} expense={expense} balance={balance} />
          {/* middle part */}
          <CardDetails />
        </div>
      </div>
    </>
  );
};

export default Dashbaord;
