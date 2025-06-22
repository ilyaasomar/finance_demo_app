import React from "react";
import EntryData from "./components/show-data";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { formatter } from "@/lib/utils";

const EntryPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  const entry_transactions = await db.journalEntry.findMany({
    where: { user_id: userId },
    include: {
      customers: true,
      suppliers: true,
      facility_accounts: true,
      bank_accounts: true,
    },
    orderBy: { registered_date: "desc" },
  });

  const formattedEntryTransactions: any = entry_transactions.map(
    (transaction, index) => {
      const myDate = new Date(transaction.registered_date);
      const formattedDate = myDate.toLocaleDateString();
      return {
        serialNumber: index + 1,
        id: transaction.id,
        entry_type: transaction.entry_type,
        customer_id: transaction.customers?.id,
        supplier_id: transaction.suppliers?.id,
        customer_name: transaction.customers?.customer_name,
        supplier_name: transaction.suppliers?.supplier_name,
        account_id: transaction.bank_accounts?.id,
        account_name: transaction.bank_accounts?.id
          ? `${transaction.bank_accounts?.account_name}# ${transaction.bank_accounts?.account_number}`
          : "",
        amount: formatter.format(Number(transaction.amount)),
        customer_or_supplier_id: transaction.facility_accounts?.id,
        customer_or_supplier_name: transaction.facility_accounts?.account_name,
        description: transaction.description,
        registered_date: formattedDate,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      };
    }
  );

  // list accounts
  const accounts = await db.account.findMany({});
  const formattedAccount: any = accounts.map((account) => ({
    value: account.id,
    label: account.account_name,
  }));

  // list customers
  const customers = await db.customer.findMany({});
  const formattedCustomer: any = customers.map((customer) => ({
    value: customer.id,
    label: customer.customer_name,
  }));

  // list accounts
  const suppliers = await db.supplier.findMany({});
  const formattedSupplier: any = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.supplier_name,
  }));

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <EntryData
        data={formattedEntryTransactions}
        customers={formattedCustomer}
        suppliers={formattedSupplier}
        accounts={formattedAccount}
      />
    </div>
  );
};

export default EntryPage;
