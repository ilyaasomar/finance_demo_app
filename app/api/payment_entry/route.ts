import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const userId = session?.user?.id;
    const {
      entry_type,
      customer_or_supplier_id,
      bank_account_id,
      amount,
      description,
      registered_date,
    } = await req.json();

    // check the entry is customer or supplier
    if (entry_type === "customer") {
      // hubi customer ka laso dire lacag malagu leyahay.
      const customer_dept = await db.customer.findUnique({
        where: { id: customer_or_supplier_id },
      });

      // hubi hadi balance ku ka yaryahay lacagta la bixinaayo
      if (customer_dept?.balance! < amount) {
        return NextResponse.json(
          `This customer owes $${customer_dept?.balance} and cannot pay $${amount}  so you can't paid`,
          { status: 401 }
        );
      } else {
        // balance ku >= lacagta la bixinaayo
        console.log("waa ka weynyahay ama la egyaahy");

        // // get account balance
        const account = await db.account.findUnique({
          where: { id: bank_account_id },
        });
        let accountBalance: any = account?.balance;
        let newAccountBalance = Number(accountBalance + amount);

        // get customer balance
        const customer = await db.customer.findUnique({
          where: { id: customer_or_supplier_id },
        });
        let customerBalance = customer?.balance;
        let newCustomerBalance = customerBalance! - amount;

        // get account receivable balance
        const accountRec = await db.facilityAccounts.findFirst({
          where: { account_name: "Account Receivable" },
        });
        let accountRecBalance = accountRec?.balance;
        let newAccountRecBalance = accountRecBalance! - amount;

        console.log({
          bank_balance: newAccountBalance,
          customer: newCustomerBalance,
          account_receivable: newAccountRecBalance,
        });

        // proceed;
        const entry = await db.paymentEntry.create({
          data: {
            entry_type,
            customer_id: customer_or_supplier_id,
            bank_account_id,
            amount,
            description,
            registered_date,
            user_id: userId,
          },
        });

        if (entry) {
          // update balance of  bank account, account receivable and customer

          await db.account.update({
            where: { id: bank_account_id, user_id: userId },
            data: { balance: newAccountBalance },
          });
          await db.customer.update({
            where: { id: customer_or_supplier_id, user_id: userId },
            data: { balance: newCustomerBalance },
          });
          await db.facilityAccounts.update({
            where: { account_name: "Account Receivable", user_id: userId },
            data: { balance: newAccountRecBalance },
          });

          return NextResponse.json(entry, { status: 201 });
        }
      }
    } else {
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
