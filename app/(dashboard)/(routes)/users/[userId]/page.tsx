import React from "react";
import db from "@/lib/db";
import UserForm from "./form";
const UserActionPage = async ({ params }: { params: { userId: string } }) => {
  let user: any = null;
  if (params.userId !== "create") {
    user = await db.users.findUnique({
      where: { id: params.userId },
    });
  }

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <UserForm initialData={user} />
    </div>
  );
};

export default UserActionPage;
