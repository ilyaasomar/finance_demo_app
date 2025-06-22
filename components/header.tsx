"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ModeToggle } from "./ui/theme-toggle";
import { Menu } from "lucide-react";
import { MobileSidebar } from "./ui/mobile-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const { data: session } = useSession();

  return (
    <>
      <header className="">
        <div className="flex h-[60px] items-center gap-4 border-b dark:border-b-gray-500 bg-white px-6 dark:bg-[#121212]">
          <Link
            className="md:hidden flex items-center gap-2 font-semibold"
            href="/"
          >
            <Image
              src="/logo-black.png"
              width={120}
              height={120}
              alt="logo"
              className="block dark:hidden w-30"
            />
            <Image
              src="/logo-white.png"
              width={120}
              height={120}
              alt="logo"
              className="hidden dark:block"
            />
          </Link>

          <div className="flex-1"></div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              <p className="hidden md:block text-md font-semibold text-gray-600 dark:text-white">
                {session?.user?.name}
              </p>
            </div>
            {/* user toggle */}
            <ModeToggle />
            {/* mobile sidebar */}
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Menu size={30} className="block lg:hidden" />
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <MobileSidebar />
                </SheetContent>
              </Sheet>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <Image
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    // @ts-ignore
                    src={
                      session?.user?.image
                        ? session.user.image
                        : "https://github.com/shadcn.png"
                    }
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
