import React from "react";
import CategoryData from "./components/show-data";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const CategoryPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  // clerify if login user is admin
  const user: any = await db.users.findUnique({ where: { id: userId } });
  const categories = await db.category.findMany({});
  const isAdmin = user?.isAdmin;
  const formattedCategories: any = categories.map((category, index) => ({
    serialNumber: index + 1,
    id: category.id,
    category_name: category.category_name,
    isAdmin: user?.isAdmin,
    login_user_id: user?.isAdmin,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  }));

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <CategoryData data={formattedCategories} user={isAdmin} />
    </div>
  );
};

export default CategoryPage;
