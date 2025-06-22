"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const SidebarUserAvatar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="hidden md:block text-md font-semibold text-gray-600 dark:text-white">
          {session?.user?.name}
        </p>
      </div>
      <Button
        onClick={() => signOut()}
        variant={"outline"}
        className="bg-[#4191F9] hover:bg-[#4191F9]"
      >
        <LogOut size={20} className="text-white" />
      </Button>
    </div>
  );
};

export default SidebarUserAvatar;
