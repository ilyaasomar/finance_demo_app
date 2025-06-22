import React from "react";
import db from "@/lib/db";
import { UserColumn } from "./components/columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import UserData from "./components/show-data";

const UserPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  // admin user can view all users
  const checkUser = await db.users.findUnique({
    where: { id: userId },
  });
  //if user is admin pass check user data to user
  let users = null;
  if (checkUser?.isAdmin) {
    users = await db.users.findMany({});
    // @ts-ignore
    const formattedUsers: UserColumn[] = users.map((user, index) => ({
      serialNumber: index + 1,
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt,
    }));
    return (
      <div className="gap-4 p-4 md:gap-8 md:p-6">
        <UserData data={formattedUsers} />
      </div>
    );
  } else {
    users = await db.users.findMany({ where: { id: userId } });
    // @ts-ignore
    const formattedUsers: UserColumn[] = users.map((user, index) => ({
      serialNumber: index + 1,
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt,
    }));
    return (
      <div className="gap-4 p-4 md:gap-8 md:p-6">
        <UserData data={formattedUsers} />
      </div>
    );
  }
};

export default UserPage;
