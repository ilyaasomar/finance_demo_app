import React from "react";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import ReportData from "./components/show-data";
import { formatter } from "@/lib/utils";

const GeneralReportPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  const userAccount = await db.account.findMany({
    where: { user_id: userId },
  });
  const userCategory = await db.category.findMany({});

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col space-y-5">
        <ReportData account_data={userAccount} category_data={userCategory} />
      </div>
    </div>
  );
};

export default GeneralReportPage;
