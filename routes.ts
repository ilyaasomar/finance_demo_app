"use client";
import {
  CreditCard,
  Landmark,
  LayoutDashboard,
  Repeat,
  Truck,
  User,
} from "lucide-react";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdAccountTree } from "react-icons/md";

import { TbCategoryPlus, TbReportMoney } from "react-icons/tb";

import { GrTransaction } from "react-icons/gr";
import { FaUsers, FaTasks, FaHandshake } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";

import { GiReceiveMoney } from "react-icons/gi";

import { usePathname } from "next/navigation";

export const Routes = () => {
  const pathname = usePathname();
  const routes = [
    {
      id: 1,
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      isActive: pathname === "/",
    },
    {
      id: 2,
      title: "Banks",
      href: "/banks",
      icon: Landmark,
      isActive: pathname === "/banks",
    },
    {
      id: 3,
      title: "Categories",
      href: "/categories",
      icon: TbCategoryPlus,
      isActive: pathname === "/categories",
    },
    {
      id: 4,
      title: "Transactions",
      href: "/transactions",
      icon: GrTransaction,
      isActive: pathname === "/transactions",
    },
    {
      id: 5,
      title: "Internal Transfer",
      href: "/internal_transfer",
      icon: Repeat,
      isActive: pathname === "/internal_transfer",
    },
    {
      id: 6,
      title: "Tasks",
      href: "/tasks",
      icon: FaTasks,
      isActive: pathname === "/tasks",
    },
    {
      id: 7,
      title: "Journal Entry",
      href: "/journal_entry",
      icon: BsFillJournalBookmarkFill,
      isActive: pathname === "/journal_entry",
    },
    {
      id: 8,
      title: "Payment Entry",
      href: "/payment_entry",
      icon: GiReceiveMoney,
      isActive: pathname === "/payment_entry",
    },

    {
      id: 9,
      title: "Customers",
      href: "/customers",
      icon: User,
      isActive: pathname === "/customers",
    },
    {
      id: 10,
      title: "Suppliers",
      href: "/suppliers",
      icon: Truck,
      isActive: pathname === "/suppliers",
    },
    {
      id: 11,
      title: "Accounts",
      href: "/accounts",
      icon: MdAccountTree,
      isActive: pathname === "/accounts",
    },
    {
      id: 12,
      title: "Account Receivable",
      href: "/account_receivable",
      icon: FaHandshake,
      isActive: pathname === "/account_receivable",
    },
    {
      id: 13,
      title: "Account Payable",
      href: "/account_payable",
      icon: CreditCard,
      isActive: pathname === "/account_payable",
    },

    {
      id: 14,
      title: "General Report",
      href: "/reports/general",
      icon: HiDocumentReport,
      isActive: pathname === "/reports/general",
    },
    {
      id: 15,
      title: "General Ledger",
      href: "/reports",
      icon: TbReportMoney,
      isActive: pathname === "/reports",
    },
    {
      id: 16,
      title: "Users",
      href: "/users",
      icon: FaUsers,
      isActive: pathname === "/users",
    },
  ];

  return routes;
};
