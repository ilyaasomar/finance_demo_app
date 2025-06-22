import React from "react";
import SupplierData from "./components/show-data";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const SupplierPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  // clerify if login user is admin
  const user: any = await db.users.findUnique({ where: { id: userId } });
  const customers = await db.supplier.findMany({});
  const isAdmin = user?.isAdmin;
  const formattedCustomers: any = customers.map((supplier, index) => ({
    serialNumber: index + 1,
    id: supplier.id,
    supplier_name: supplier.supplier_name,
    phone: supplier.phone,
    address: supplier.address,
    balance: supplier.balance,
    isAdmin: user?.isAdmin,
    login_user_id: user?.isAdmin,
    createdAt: supplier.createdAt,
    updatedAt: supplier.updatedAt,
  }));

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <SupplierData data={formattedCustomers} user={isAdmin} />
    </div>
  );
};

export default SupplierPage;
