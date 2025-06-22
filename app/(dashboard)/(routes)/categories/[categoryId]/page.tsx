import React from "react";
import CategoryForm from "./form";
import db from "@/lib/db";
const CategoryActionPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  let category: any = null;
  if (params.categoryId !== "create") {
    category = await db.category.findUnique({
      where: { id: params.categoryId },
    });
  }
  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <CategoryForm initialData={category} />
    </div>
  );
};

export default CategoryActionPage;
