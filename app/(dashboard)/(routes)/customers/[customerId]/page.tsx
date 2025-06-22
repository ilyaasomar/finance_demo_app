import React from "react";
import CustomerForm from "./form";
import db from "@/lib/db";
const CustomerActionPage = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  let customer: any = null;
  if (params.customerId !== "create") {
    customer = await db.customer.findUnique({
      where: { id: params.customerId },
    });
  }
  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <CustomerForm initialData={customer} />
    </div>
  );
};

export default CustomerActionPage;
