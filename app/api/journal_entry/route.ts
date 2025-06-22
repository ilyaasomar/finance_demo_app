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
      // proceed;
      const entry = await db.journalEntry.create({
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

      // get account balance
      const account = await db.account.findUnique({
        where: { id: bank_account_id },
      });
      let accountBalance: any = account?.balance;
      let newAccountBalance = Number(accountBalance - amount);

      // get customer balance
      const customer = await db.customer.findUnique({
        where: { id: customer_or_supplier_id },
      });
      let customerBalance = customer?.balance;
      let newCustomerBalance = customerBalance + amount;

      // get account receivable balance
      const accountRec = await db.facilityAccounts.findFirst({
        where: { account_name: "Account Receivable" },
      });
      let accountRecBalance = accountRec?.balance;
      let newAccountRecBalance = accountRecBalance + amount;

      if (entry) {
        // update balance of  bank account, account receivable and customer

        await db.account.update({
          where: { id: bank_account_id },
          data: { balance: newAccountBalance },
        });
        await db.customer.update({
          where: { id: customer_or_supplier_id },
          data: { balance: newCustomerBalance },
        });
        await db.facilityAccounts.update({
          where: { account_name: "Account Receivable" },
          data: { balance: newAccountRecBalance },
        });

        return NextResponse.json(entry, { status: 201 });
      }
    } else {
      const entry = await db.journalEntry.create({
        data: {
          entry_type,
          supplier_id: customer_or_supplier_id,
          amount,
          description,
          registered_date,
          user_id: userId,
        },
      });

      // get customer balance
      const supplier = await db.supplier.findUnique({
        where: { id: customer_or_supplier_id },
      });
      let supplierBalance = supplier?.balance;
      let newSupplierBalance = supplierBalance + amount;

      // get account receivable balance
      const accountPayable = await db.facilityAccounts.findFirst({
        where: { account_name: "Account Payable" },
      });
      let accountPayableBalance = accountPayable?.balance;
      let newAccountPayableBalance = accountPayableBalance + amount;
      if (entry) {
        // update account payable and supplier balance
        await db.supplier.update({
          where: { id: customer_or_supplier_id },
          data: { balance: newSupplierBalance },
        });
        await db.facilityAccounts.update({
          where: { account_name: "Account Payable" },
          data: { balance: newAccountPayableBalance },
        });

        return NextResponse.json(entry, { status: 201 });
      }
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
