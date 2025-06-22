import React from "react";
import db from "@/lib/db";
import SupplierForm from "./form";
const SupplierActionPage = async ({
  params,
}: {
  params: { supplierId: string };
}) => {
  let supplier: any = null;
  if (params.supplierId !== "create") {
    supplier = await db.supplier.findUnique({
      where: { id: params.supplierId },
    });
  }
  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <SupplierForm initialData={supplier} />
    </div>
  );
};

export default SupplierActionPage;
