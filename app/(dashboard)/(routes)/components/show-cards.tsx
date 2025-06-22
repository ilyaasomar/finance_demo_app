import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import DashboardCards from "./dashboard-cards";

const CardDetails = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user.id;
  //   select account from database
  const accounts = await db.account.findMany({ where: { user_id: userId } });

  const transactions = await db.transaction.findMany({
    where: { user_id: userId },
    include: { categories: true },
  });
  //
  let totalSalary = 0;
  transactions.forEach((element) => {
    element.categories.category_name === "Salary"
      ? (totalSalary += element.amount)
      : 0;
  });
  //
  const totalHouse: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "House Bill"
      ? accumulator + element.amount
      : accumulator;
  }, 0);
  //
  const totalEducation: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "Education Fees"
      ? accumulator + element.amount
      : accumulator;
  }, 0);
  //
  const totalTransporation: number = transactions.reduce(
    (accumulator, element) => {
      return element.categories.category_name === "Transportation Fees"
        ? accumulator + element.amount
        : accumulator;
    },
    0
  );
  //
  const totalSadaqo: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "Sadaqo"
      ? accumulator + element.amount
      : accumulator;
  }, 0);
  //
  const totalRestaurant: number = transactions.reduce(
    (accumulator, element) => {
      return element.categories.category_name === "Restaurant Bill"
        ? accumulator + element.amount
        : accumulator;
    },
    0
  );
  //
  const totalShopping: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "Shopping"
      ? accumulator + element.amount
      : accumulator;
  }, 0);
  //
  const totalGifts: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "Gifts and Donations"
      ? accumulator + element.amount
      : accumulator;
  }, 0);
  //
  const totalQaaraan: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "Qaraan"
      ? accumulator + element.amount
      : accumulator;
  }, 0);
  //
  const totalOthers: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "Other Charges"
      ? accumulator + element.amount
      : accumulator;
  }, 0);

  const totalFreelancing: number = transactions.reduce(
    (accumulator, element) => {
      return element.categories.category_name === "Freelancing"
        ? accumulator + element.amount
        : accumulator;
    },
    0
  );

  const totalSelfTouch: number = transactions.reduce((accumulator, element) => {
    return element.categories.category_name === "Self Learning & Development"
      ? accumulator + element.amount
      : accumulator;
  }, 0);
  //
  const totalAccReceivalbe: number = transactions.reduce(
    (accumulator, element) => {
      return element.categories.category_name === "Accounts Receivable"
        ? accumulator + element.amount
        : accumulator;
    },
    0
  );
  //
  const totalInternetBill: number = transactions.reduce(
    (accumulator, element) => {
      return element.categories.category_name === "Internet Bill"
        ? accumulator + element.amount
        : accumulator;
    },
    0
  );
  return (
    <div>
      <DashboardCards
        salary={totalSalary}
        freelancing={totalFreelancing}
        house={totalHouse}
        education={totalEducation}
        selfTouch={totalSelfTouch}
        transporation={totalTransporation}
        sadaqo={totalSadaqo}
        restaurant={totalRestaurant}
        shopping={totalShopping}
        gifts={totalGifts}
        internet={totalInternetBill}
        accountReceivable={totalAccReceivalbe}
        qaaraan={totalQaaraan}
        others={totalOthers}
      />
    </div>
  );
};

export default CardDetails;
