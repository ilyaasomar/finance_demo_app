"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { DollarSign, Eye, EyeOff, Receipt, Wallet } from "lucide-react";

import { styles } from "@/app/styles";
interface CardProps {
  income: number;
  expense: number;
  balance: number;
}
const Cards = ({ income, expense, balance }: CardProps) => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [showIncome, setShowIncome] = useState<boolean>(false);
  const [showExpense, setShowExpense] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 lg:gap-x-10 gap-y-7">
      {/*  */}
      <Card className="p-5 bg-green-600 dark:bg-transparent">
        <CardContent className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            {/* first div */}
            <div className="flex flex-col items-start gap-y-5">
              <div className="flex flex-row items-center gap-x-2">
                <div className="bg-white dark:bg-primaryColor w-8 h-8 rounded-lg flex items-center justify-center">
                  <Receipt
                    size={24}
                    className={`${styles.primaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
                <h1 className="text-[20px] text-white">Income</h1>
              </div>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-white flex items-center justify-center">
                  {showIncome ? formatter.format(income) : "*******"}
                </p>
              </div>
            </div>
            {/* second div */}
            <div className="">
              {showIncome ? (
                <EyeOff
                  size={36}
                  onClick={() => setShowIncome(!showIncome)}
                  className="text-white"
                />
              ) : (
                <Eye
                  size={36}
                  onClick={() => setShowIncome(!showIncome)}
                  className="text-white"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* expense */}

      <Card className="p-5 bg-red-800 dark:bg-transparent">
        <CardContent className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            {/* first div */}
            <div className="flex flex-col items-start gap-y-5">
              <div className="flex flex-row items-center gap-x-2">
                <div className="bg-white dark:bg-primaryColor w-8 h-8 rounded-lg flex items-center justify-center">
                  <DollarSign
                    size={24}
                    className={`${styles.primaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
                <h1 className="text-[20px] text-white">Expense</h1>
              </div>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-white flex items-center justify-center">
                  {showExpense ? formatter.format(expense) : "*******"}
                </p>
              </div>
            </div>
            {/* second div */}
            <div className="">
              {showExpense ? (
                <EyeOff
                  size={36}
                  onClick={() => setShowExpense(!showExpense)}
                  className="text-white"
                />
              ) : (
                <Eye
                  size={36}
                  onClick={() => setShowExpense(!showExpense)}
                  className="text-white"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* balance */}

      <Card className={`p-5 ${styles.secondaryBgColor} dark:bg-transparent`}>
        <CardContent className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            {/* first div */}
            <div className="flex flex-col items-start gap-y-5">
              <div className="flex flex-row items-center gap-x-2">
                <div className="bg-white dark:bg-primaryColor w-8 h-8 rounded-lg flex items-center justify-center">
                  <DollarSign
                    size={24}
                    className={`${styles.primaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
                <h1 className="text-[20px] text-white">Balance</h1>
              </div>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-white flex items-center justify-center">
                  {showBalance ? formatter.format(balance) : "*******"}
                </p>
              </div>
            </div>
            {/* second div */}
            <div className="">
              {showBalance ? (
                <EyeOff
                  size={36}
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white"
                />
              ) : (
                <Eye
                  size={36}
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
