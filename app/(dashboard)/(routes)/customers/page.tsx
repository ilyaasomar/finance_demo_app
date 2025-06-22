import React from "react";
import CustomerData from "./components/show-data";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const CustomerPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  // clerify if login user is admin
  const user: any = await db.users.findUnique({ where: { id: userId } });
  const customers = await db.customer.findMany({});
  const isAdmin = user?.isAdmin;
  const formattedCustomers: any = customers.map((customer, index) => ({
    serialNumber: index + 1,
    id: customer.id,
    customer_name: customer.customer_name,
    phone: customer.phone,
    address: customer.address,
    balance: customer.balance,
    isAdmin: user?.isAdmin,
    login_user_id: user?.isAdmin,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  }));

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <CustomerData data={formattedCustomers} user={isAdmin} />
    </div>
  );
};

export default CustomerPage;
