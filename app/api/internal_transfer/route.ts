import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    if (!userId) {
      return new NextResponse("Unauthonticated please login", { status: 401 });
    }
    const transactions = await db.internalTransfer.findMany({
      where: { user_id: userId },
    });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { from_account, to_account, amount, registered_date } =
      await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if both account is same
    const isCheckAccount = from_account === to_account;
    if (isCheckAccount) {
      return new NextResponse("You can't transfer money same account", {
        status: 409,
      });
    }

    // check from account
    const fromAccount = await db.account.findUnique({
      where: {
        id: from_account,
      },
    });
    if (!fromAccount) {
      return new NextResponse("Account not found", { status: 409 });
    }

    // check if amount is beger then account balance
    if (fromAccount.balance < amount) {
      return new NextResponse(
        `Insuficient Balance. your balance is $${fromAccount.balance}`,
        { status: 403 }
      );
    }

    // check to account
    const toAccount = await db.account.findUnique({
      where: {
        id: to_account,
      },
    });
    if (!toAccount) {
      return new NextResponse("Account not found", { status: 409 });
    }

    // get accounts balance
    const fromAccountUpdatedBalance = Number(fromAccount.balance - amount);
    const toAccountUpdatedBalance = Number(toAccount.balance + amount);

    // create internal transfer
    const internalTransferTransaction = await db.internalTransfer.create({
      data: {
        from_account,
        to_account,
        amount,
        registered_date,
        user_id: userId,
      },
    });

    if (internalTransferTransaction) {
      // subtract from first account and add to second account

      const updatedFromAccount = await db.account.update({
        where: { id: from_account },
        data: {
          balance: fromAccountUpdatedBalance,
        },
      });

      if (updatedFromAccount) {
        await db.account.update({
          where: { id: to_account },
          data: {
            balance: toAccountUpdatedBalance,
          },
        });
      }
    }

    return NextResponse.json(internalTransferTransaction, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
