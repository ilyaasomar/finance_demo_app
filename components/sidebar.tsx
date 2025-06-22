"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes";
import SidebarUserAvatar from "./sidebarUserAvatar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleSidebar }) => {
  const routes = Routes();

  return (
    <div
      className={cn(
        "relative border-r dark:border-r-gray-500 overflow-y-auto bg-white dark:bg-[#121212] h-full transition-all duration-300",
        isCollapsed ? "w-24" : "w-64"
      )}
    >
      <div className="flex flex-col gap-2 h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-14 lg:h-[60px] px-4 border-b dark:border-b-gray-500">
          <Link href="/">
            {isCollapsed ? (
              <Image
                src="/favicon.png" // Small logo for collapsed state
                width={180}
                height={180}
                alt="logo"
              />
            ) : (
              <Image
                src="/logo-black.png" // Main logo for expanded state
                width={120}
                height={120}
                alt="logo"
                className="block dark:hidden"
              />
            )}
          </Link>
        </div>

        {/* Sidebar items */}
        <div className="flex-1 mt-5">
          <nav className="grid items-start px-2 lg:px-4 text-sm lg:text-[15px] font-medium gap-y-2">
            {routes.map((route) => (
              <Link
                key={route.id}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-all",
                  route.isActive
                    ? "bg-[#4191F9] text-white dark:text-white"
                    : "text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:text-white",
                  isCollapsed && "justify-center"
                )}
                href={route.href}
              >
                <route.icon
                  className={cn(
                    "transition-all",
                    route.isActive
                      ? "text-white"
                      : "text-gray-900 dark:text-white",
                    isCollapsed ? "h-5 w-5" : "h-4 w-4"
                  )}
                />
                {!isCollapsed && route.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-6">{!isCollapsed && <SidebarUserAvatar />}</div>
      </div>

      {/* Expand/Collapse Button */}
      {
        <button
          className={cn(
            "absolute right-0 top-10 z-[10000] transform translate-x-1/2 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
            isCollapsed && "-translate-y-1/2"
          )}
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      }
    </div>
  );
};
export default Sidebar;
