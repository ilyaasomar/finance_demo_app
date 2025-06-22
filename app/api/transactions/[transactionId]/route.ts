import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { transactionId: string } }
) {
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
    // hubi xogta hore kuugu diwaangashaneed
    const checkTrans = await db.transaction.findUnique({
      where: { id: params.transactionId },
    });
    // check if transaction is an income
    let oldTransType = checkTrans?.transaction_type;
    let newTrasnType = transaction_type;

    if (oldTransType === "income" && newTrasnType === "income") {
      // check account
      const account = await db.account.findUnique({
        where: { id: checkTrans?.account_id, user_id: userId },
      });
      const accBalance: any = account?.balance;
      const transBalance: any = checkTrans?.amount;
      const lastAccBalance: number = accBalance - transBalance;
      const newBalance = lastAccBalance + amount;
      // // show current account balance
      // if and else can you this account that is why i got out of the if
      let currentAccount = await db.account.findUnique({
        where: { id: account_id },
      });
      if (checkTrans?.account_id !== account_id) {
        // update transaction
        const transaction = await db.transaction.update({
          where: { id: params.transactionId },
          data: {
            transaction_type,
            category_id,
            amount,
            account_id,
            description,
            registered_date,
          },
        });
        if (transaction) {
          // update previous account
          await db.account.update({
            where: { id: checkTrans?.account_id, user_id: userId },
            data: {
              balance: lastAccBalance,
            },
          });
          // update current account
          await db.account.update({
            where: { id: account_id, user_id: userId },
            data: {
              balance: currentAccount?.balance + amount,
            },
          });
        }

        return NextResponse.json(transaction, { status: 201 });
      } else {
        // update transaction
        const transaction = await db.transaction.update({
          where: { id: params.transactionId },
          data: {
            transaction_type,
            category_id,
            amount,
            account_id,
            description,
            registered_date,
          },
        });
        if (transaction) {
          // update account
          await db.account.update({
            where: { id: checkTrans?.account_id, user_id: userId },
            data: {
              balance: newBalance,
            },
          });

          return NextResponse.json(transaction, { status: 201 });
        }
      }
    } else if (oldTransType === "expense" && newTrasnType === "expense") {
      // check account
      const account = await db.account.findUnique({
        where: { id: checkTrans?.account_id, user_id: userId },
      });
      const accBalance: any = account?.balance;
      const transBalance: any = checkTrans?.amount;
      const lastAccBalance: number = accBalance + transBalance;
      const newBalance = lastAccBalance - amount;
      // check if accountLast balance > amount gonna to update
      if (lastAccBalance < amount) {
        return new NextResponse(
          `Amount can't be more then $${lastAccBalance} `,
          { status: 403 }
        );
      }

      // check if bank account chanaged
      if (checkTrans?.account_id !== account_id) {
        // update last account
        let lastAccount = await db.account.findUnique({
          where: { id: account_id },
        });
        let lastAccountBalance: any = lastAccount?.balance;
        if (lastAccountBalance < amount) {
          return new NextResponse(
            `Amount can't be more then $${lastAccountBalance} `,
            { status: 403 }
          );
        } else {
          // update transaction
          const transaction = await db.transaction.update({
            where: { id: params.transactionId },
            data: {
              transaction_type,
              category_id,
              amount,
              account_id,
              description,
              registered_date,
            },
          });
          if (transaction) {
            // update previous account
            await db.account.update({
              where: { id: checkTrans?.account_id, user_id: userId },
              data: {
                balance: lastAccBalance,
              },
            });
            // update current account
            await db.account.update({
              where: { id: account_id, user_id: userId },
              data: {
                balance: lastAccountBalance - amount,
              },
            });
          }

          return NextResponse.json(transaction, { status: 201 });
        }
      } else {
        // update transaction
        const transaction = await db.transaction.update({
          where: { id: params.transactionId },
          data: {
            transaction_type,
            category_id,
            amount,
            account_id,
            description,
            registered_date,
          },
        });
        // if transaction completed update account balance
        if (transaction) {
          await db.account.update({
            where: { id: checkTrans?.account_id, user_id: userId },
            data: {
              balance: newBalance,
            },
          });
        }
      }

      return NextResponse.json("hi");
    } else {
      if (oldTransType === "expense" && newTrasnType === "income") {
        // check account
        const account = await db.account.findUnique({
          where: { id: checkTrans?.account_id, user_id: userId },
        });

        const accBalance: any = account?.balance;
        const transBalance: any = checkTrans?.amount;
        const lastAccBalance: number = accBalance + transBalance;
        const newBalance = lastAccBalance + amount;

        // update transaction
        const transaction = await db.transaction.update({
          where: { id: params.transactionId },
          data: {
            transaction_type,
            category_id,
            amount,
            account_id,
            description,
            registered_date,
          },
        });
        // if transaction completed update account balance
        if (transaction) {
          await db.account.update({
            where: { id: checkTrans?.account_id, user_id: userId },
            data: {
              balance: newBalance,
            },
          });
        }
        return NextResponse.json(transaction, { status: 201 });
      } else if (oldTransType === "income" && newTrasnType === "expense") {
        // check account
        const account = await db.account.findUnique({
          where: { id: checkTrans?.account_id, user_id: userId },
        });

        const accBalance: any = account?.balance;
        const transBalance: any = checkTrans?.amount;
        const lastAccBalance: number = accBalance - transBalance;
        const newBalance = lastAccBalance - amount;

        // check if accountLast balance > amount gonna to update
        if (lastAccBalance < amount) {
          return new NextResponse(
            `Amount can't be more then $${lastAccBalance} `,
            { status: 403 }
          );
        } else {
          // update transaction
          const transaction = await db.transaction.update({
            where: { id: params.transactionId },
            data: {
              transaction_type,
              category_id,
              amount,
              account_id,
              description,
              registered_date,
            },
          });
          // if transaction completed update account balance
          if (transaction) {
            await db.account.update({
              where: { id: checkTrans?.account_id, user_id: userId },
              data: {
                balance: newBalance,
              },
            });
          }
          return NextResponse.json(transaction, { status: 201 });
        }
      }
    }

    return NextResponse.json("Internal", { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { transactionId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if category exist
    const checkTransaction = await db.transaction.findUnique({
      where: { id: params.transactionId, user_id: userId },
    });

    if (!checkTransaction) {
      return new NextResponse("transaction not found", { status: 409 });
    }

    // fetch account balance
    const account = await db.account.findFirst({
      where: { id: checkTransaction.account_id },
    });

    // check type of transaction

    const typeTransaction = checkTransaction.transaction_type;
    if (typeTransaction === "income") {
      // @ts-ignore
      let newBalance = account?.balance - checkTransaction?.amount;
      // @ts-ignore
      if (account?.balance < checkTransaction.amount) {
        return new NextResponse(
          "You can not delete this transaction becouse account will be minus",
          { status: 500 }
        );
      }

      // detele transaction and update account
      const deleteTrans = await db.transaction.delete({
        where: {
          id: params.transactionId,
          user_id: userId,
        },
      });
      if (deleteTrans) {
        // update account

        await db.account.update({
          where: { id: checkTransaction.account_id },
          data: {
            balance: newBalance,
          },
        });
      }
      return NextResponse.json(deleteTrans, { status: 201 });
    } else {
      // @ts-ignore
      let newBalance = account?.balance + checkTransaction?.amount;

      // detele transaction and update account
      const deleteTrans = await db.transaction.delete({
        where: {
          id: params.transactionId,
          user_id: userId,
        },
      });
      if (deleteTrans) {
        // update account

        await db.account.update({
          where: { id: checkTransaction.account_id },
          data: {
            balance: newBalance,
          },
        });
      }
    }

    return NextResponse.json("deletedCategory", { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
