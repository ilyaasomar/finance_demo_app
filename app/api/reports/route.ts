import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { account_id, from_date, to_date } = await req.json();

    let transactions = null;

    const endOfDay = new Date(to_date);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
    transactions = await db.transaction.findMany({
      where: {
        user_id: userId,
        account_id: account_id,
        registered_date: {
          gte: from_date,
          lte: endOfDay,
        },
      },
      include: { accounts: true, categories: true },
      orderBy: { registered_date: "asc" },
    });

    // loooooop

    const formattedTransactions: any[] = [];
    let newBalance: number = 0;
    let serialNumber: number = 0;
    for (const transaction of transactions) {
      serialNumber++;
      const myDate = new Date(transaction.registered_date);
      const formattedDate = myDate.toLocaleDateString();

      if (transaction.transaction_type === "income") {
        newBalance += transaction.amount;
      } else if (transaction.transaction_type === "expense") {
        newBalance -= transaction.amount;
      }

      formattedTransactions.push({
        serialNumber,
        id: transaction.id,
        transaction_type: transaction.transaction_type,
        category_name: transaction.categories.category_name,
        account_name: `${transaction.accounts.bank_name} ## ${transaction.accounts.account_number}`,
        amount: formatter.format(Number(transaction.amount)),
        debit: `$ ${
          transaction.transaction_type === "income" ? transaction.amount : 0
        }`,
        credit: `$ ${
          transaction.transaction_type === "expense" ? transaction.amount : 0
        }`,
        balance: `${formatter.format(Number(newBalance))}`,
        account_id: transaction.account_id,
        registered_date: formattedDate,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      });
    }

    return NextResponse.json(formattedTransactions, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
