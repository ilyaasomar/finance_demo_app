"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen grid lg:grid-cols-[auto_1fr]">
      {/* Sidebar only visible on large screens */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 lg:p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
