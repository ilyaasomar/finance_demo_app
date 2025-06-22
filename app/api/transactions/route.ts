import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    if (!userId) {
      return new NextResponse("Unauthonticated please login", { status: 401 });
    }
    const transactions = await db.transaction.findMany({
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
    const {
      transaction_type,
      category_id,
      amount,
      account_id,
      description,
      registered_date,
    } = await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    if (transaction_type === "income") {
      // check account balance
      const account = await db.account.findUnique({
        where: {
          id: account_id,
        },
      });
      let newBalance = 0;
      newBalance = amount + account?.balance;

      // Parse the input date string

      const transaction = await db.transaction.create({
        data: {
          transaction_type,
          category_id,
          amount,
          account_id,
          description,
          user_id: userId,
          registered_date,
        },
      });
      if (transaction) {
        // update account balance
        const account = await db.account.update({
          where: {
            id: account_id,
            user_id: userId,
          },
          data: {
            balance: newBalance,
          },
        });
      }

      return NextResponse.json(transaction, { status: 201 });
    } else if (transaction_type === "expense") {
      // check account balance
      const account = await db.account.findUnique({
        where: {
          id: account_id,
        },
      });
      //@ts-ignore
      if (account?.balance < amount) {
        return new NextResponse(
          `Insuficient Balance your balance is $${account?.balance}`,
          { status: 403 }
        );
      }
      // @ts-ignore
      else if (account?.balance >= amount) {
        // @ts-ignore
        const newBalance = account?.balance - amount;
        const transaction = await db.transaction.create({
          data: {
            transaction_type,
            category_id,
            amount,
            account_id,
            description,
            user_id: userId,
            registered_date,
          },
        });
        if (transaction) {
          // update account balance
          const account = await db.account.update({
            where: {
              id: account_id,
              user_id: userId,
            },
            data: {
              balance: newBalance,
            },
          });
        }
        return NextResponse.json(transaction, { status: 201 });
      } else {
        return new NextResponse("Internal server error", { status: 402 });
      }
    }
    return NextResponse.json("Internal", { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
