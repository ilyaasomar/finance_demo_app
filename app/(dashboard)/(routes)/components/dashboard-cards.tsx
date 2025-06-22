"use client";
import { styles } from "@/app/styles";
import { Card, CardContent } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
interface CardProps {
  salary: number;
  freelancing: number;
  house: number;
  education: number;
  selfTouch: number;
  transporation: number;
  sadaqo: number;
  restaurant: number;
  shopping: number;
  gifts: number;
  internet: number;
  accountReceivable: number;
  qaaraan: number;
  others: number;
}
const DashboardCards = ({
  salary,
  freelancing,
  house,
  education,
  selfTouch,
  transporation,
  sadaqo,
  restaurant,
  shopping,
  gifts,
  internet,
  accountReceivable,
  qaaraan,
  others,
}: CardProps) => {
  const [showSalary, setShowSalary] = useState<boolean>(false);
  const [showFreelancing, setShowFreelancing] = useState<boolean>(false);
  const [showBill, setShowBill] = useState<boolean>(false);
  const [showEducation, setShowEducation] = useState<boolean>(false);
  const [showSadaqo, setShowSadaqo] = useState<boolean>(false);
  const [showGift, setShowGift] = useState<boolean>(false);
  const [showAccReceivable, setShowAccReceivable] = useState<boolean>(false);
  const [showQaaraan, setShowQaaraan] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-x-5 lg:gap-x-10 gap-y-7">
      {/* salary */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  Salary
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showSalary ? formatter.format(salary) : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showSalary ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowSalary(!showSalary)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowSalary(!showSalary)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time salary
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Freelancing */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  Freelancing
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showFreelancing
                      ? formatter.format(freelancing)
                      : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showFreelancing ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowFreelancing(!showFreelancing)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowFreelancing(!showFreelancing)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time freelance income
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* house bill  */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  House Bill
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showBill ? formatter.format(house) : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showBill ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowBill(!showBill)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowBill(!showBill)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time house bill
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* education */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  Education Fees
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showEducation ? formatter.format(education) : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showEducation ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowEducation(!showEducation)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowEducation(!showEducation)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time Education Fees
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* self learning & development */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center">
                {/* icon */}
                <div
                  className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                >
                  <FaMoneyBill
                    size={24}
                    className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
              </div>
              <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                Self Touch & Development
              </h1>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                  {formatter.format(selfTouch)}
                </p>
              </div>
            </div>
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time self touch expense
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* transportation */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center">
                {/* icon */}
                <div
                  className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                >
                  <FaMoneyBill
                    size={24}
                    className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
              </div>
              <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                Transportation Fees
              </h1>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                  {formatter.format(transporation)}
                </p>
              </div>
            </div>
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time transportation fees
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* education */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  Sadaqo
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showSadaqo ? formatter.format(sadaqo) : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showSadaqo ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowSadaqo(!showSadaqo)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowSadaqo(!showSadaqo)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time Sadaqo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* restaurant */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center">
                {/* icon */}
                <div
                  className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                >
                  <FaMoneyBill
                    size={24}
                    className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
              </div>
              <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                Restaurant Bill
              </h1>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                  {formatter.format(restaurant)}
                </p>
              </div>
            </div>
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time Restaurant Bill
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*shopping */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center">
                {/* icon */}
                <div
                  className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                >
                  <FaMoneyBill
                    size={24}
                    className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
              </div>
              <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                Shopping
              </h1>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                  {formatter.format(shopping)}
                </p>
              </div>
            </div>
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time Shopping
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* gift & donation */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  Gifts and Donations
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showGift ? formatter.format(gifts) : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showGift ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowGift(!showGift)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowGift(!showGift)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time gifts & donations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* internet bill */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center">
                {/* icon */}
                <div
                  className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                >
                  <FaMoneyBill
                    size={24}
                    className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
              </div>
              <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                Internet Bill
              </h1>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                  {formatter.format(internet)}
                </p>
              </div>
            </div>
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time internet bill
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* deynta iga maqan */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  Account Receivable
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showAccReceivable
                      ? formatter.format(accountReceivable)
                      : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showAccReceivable ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowAccReceivable(!showAccReceivable)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowAccReceivable(!showAccReceivable)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time money i owe people
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* qaaraan */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            {/* container div */}
            <div className="flex justify-between">
              {/* right div */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  {/* icon */}
                  <div
                    className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                  >
                    <FaMoneyBill
                      size={24}
                      className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                    />
                  </div>
                </div>
                <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                  Qaaraan
                </h1>
                <div className="flex flex-wrap justify-between gap-y-3 items-center">
                  <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                    {showQaaraan ? formatter.format(qaaraan) : "*******"}
                  </p>
                </div>
              </div>
              {/* left div */}
              <div className="">
                {showQaaraan ? (
                  <EyeOff
                    size={36}
                    onClick={() => setShowQaaraan(!showQaaraan)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                ) : (
                  <Eye
                    size={36}
                    onClick={() => setShowQaaraan(!showQaaraan)}
                    className={`${styles.secondaryColor} dark:text-white`}
                  />
                )}
              </div>
            </div>
            {/* footer div */}
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time Qaaraan
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* others */}
      <Card className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col gap-y-5 h-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center">
                {/* icon */}
                <div
                  className={`bg-white dark:bg-primaryColor w-9 h-9 rounded-md border-[0.5px] border-[#4191F9] flex items-center justify-center`}
                >
                  <FaMoneyBill
                    size={24}
                    className={`${styles.secondaryColor} dark:${styles.primaryColor}`}
                  />
                </div>
              </div>
              <h1 className="font-semibold text-[16px] text-gray-600 dark:text-white">
                Others
              </h1>
              <div className="flex flex-wrap justify-between gap-y-3 items-center">
                <p className="font-extrabold text-3xl text-gray-600 dark:text-white flex items-center justify-center">
                  {formatter.format(others)}
                </p>
              </div>
            </div>
            <div className="border-t-[0.5px] border-t-gray-200 py-1 mb-0">
              <p className="font-semibold text-xs text-gray-500 dark:text-white">
                All time others
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
