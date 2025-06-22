import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { entryId: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);
//     // @ts-ignore
//     const userId = session?.user?.id;
//     const {
//       entry_type,
//       customer_or_supplier_id,
//       amount,
//       description,
//       registered_date,
//     } = await req.json();
//     // check if account exist
//     const existEntry = await db.journalEntry.findUnique({
//       where: { id: params.entryId, user_id: userId },
//     });

//     if (!existEntry) {
//       throw new NextResponse("Journal entry not found");
//     }

//     //  check if oldEntry and new entry as same as customer
//     if (existEntry.entry_type && entry_type === "customer") {
//       console.log("both are customer");
//     }

//     return NextResponse.json("account", { status: 201 });
//   } catch (error) {
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }

export async function DELETE(
  req: Request,
  { params }: { params: { entryId: string } }
) {
  try {
    const entry = await db.journalEntry.findUnique({
      where: { id: params.entryId },
    });
    if (!entry) {
      throw new NextResponse("Journal entry not found");
    }
    // delete journal entry
    const deletedEntry = await db.journalEntry.delete({
      where: { id: params.entryId },
    });

    if (deletedEntry) {
      // check if type equals customer then update account and customer
      if (entry.entry_type === "customer") {
        // get bank account balance
        const account = await db.account.findUnique({
          where: { id: entry.bank_account_id as string },
        });
        let accountBalance: any = account?.balance;
        let newAccountBalance = Number(accountBalance + entry.amount);
        // get customer balance
        const customer = await db.customer.findUnique({
          where: { id: entry.customer_id as string },
        });
        let customerBalance: any = customer?.balance;
        let newCustomerBalance = Number(customerBalance - entry.amount);

        // // get account receivable balance
        const accountRec = await db.facilityAccounts.findFirst({
          where: { account_name: "Account Receivable" },
        });
        let accountRecBalance: any = accountRec?.balance;
        let newAccountRecBalance = Number(accountRecBalance - entry.amount);

        // update account receivable and customer balance

        await db.account.update({
          where: { id: entry.bank_account_id as string },
          data: { balance: newAccountBalance },
        });

        await db.customer.update({
          where: { id: entry.customer_id as string },
          data: { balance: newCustomerBalance },
        });
        await db.facilityAccounts.update({
          where: { account_name: "Account Receivable" },
          data: { balance: newAccountRecBalance },
        });

        return NextResponse.json(deletedEntry, { status: 201 });
      } else {
        console.log("you're in supplier else");
        //   // if type equals supplier and account
        //   // get supplier balance
        const supplier = await db.supplier.findUnique({
          where: { id: entry.supplier_id as string },
        });
        let supplierBalance: any = supplier?.balance;
        let newSupplierBalance = Number(supplierBalance - entry.amount);

        //   // get account Payable balance
        const accountPayable = await db.facilityAccounts.findFirst({
          where: { account_name: "Account Payable" },
        });
        let accountPayableBalance: any = accountPayable?.balance;
        let newAccountPayableBalance = Number(
          accountPayableBalance - entry.amount
        );

        console.log(newSupplierBalance);
        console.log(newAccountPayableBalance);

        //   // update account receivable and customer balance
        await db.supplier.update({
          where: { id: entry.supplier_id as string },
          data: { balance: newSupplierBalance },
        });
        await db.facilityAccounts.update({
          where: { account_name: "Account Payable" },
          data: { balance: newAccountPayableBalance },
        });

        return NextResponse.json("deletedEntry", { status: 201 });
      }
    } else {
      return NextResponse.json("delete not happened", { status: 401 });
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
