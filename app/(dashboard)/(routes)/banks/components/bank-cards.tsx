"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { styles } from "@/app/styles";
import { Edit, Eye, EyeIcon, EyeOff, Landmark, Trash2 } from "lucide-react";
import { Account } from "@prisma/client";
import { useRouter } from "next/navigation";
interface BankAccountsProps {
  bankData: Account[];
}
const BankAccounts = ({ bankData }: BankAccountsProps) => {
  const router = useRouter();
  const [visibleBankId, setVisibleBankId] = useState<string | null>(null);

  const toggleVisibility = (bankId: string) => {
    setVisibleBankId((prevId) => (prevId === bankId ? null : bankId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 pt-5">
      {bankData.map((data) => (
        <Card
          key={data.id}
          className="pt-5 border-[0.5px] border-gray-300 dark:bg-transparent shadow-lg"
        >
          <CardContent className="flex flex-col">
            <div className="flex flex-col gap-y-5">
              {/* container div */}
              <div className="flex flex-col">
                {/* top section */}
                <div className="flex justify-between items-center">
                  {/* left section */}
                  <div className="flex items-center space-x-2">
                    <Landmark
                      size={26}
                      className={`${styles.secondaryColor} font-bold dark:text-white`}
                    />
                    <h1
                      className={`font-semibold text-[16px] ${styles.primaryColor} dark:text-white`}
                    >
                      {data.bank_name}
                    </h1>
                  </div>
                  {/* right section */}
                  <div className="">
                    <Edit
                      size={17}
                      className={`${styles.primaryColor} dark:text-white cursor-pointer`}
                      onClick={() => {
                        router.push(`/banks/${data.id}`);
                      }}
                    />
                  </div>
                </div>

                {/* middle section */}
                <div className="flex flex-col gap-y-2 mt-2">
                  <div className="flex justify-between items-center gap-y-3 my-3">
                    {/* left section */}
                    <div className="flex flex-col ml-2 space-y-1">
                      <h2
                        className={`font-semibold text-[15px] ${styles.primaryColor} dark:text-white`}
                      >
                        {data.account_number}
                      </h2>
                      <div>
                        <p
                          className={`font-bold text-[20px] ${styles.primaryColor} dark:text-white`}
                        >
                          {visibleBankId === data.id ? data.balance : "*****"}
                        </p>
                        <p className={`font-normal text-sm text-gray-600 dark:text-white`}>
                          Balance
                        </p>
                      </div>
                      <p
                        className={`font-semibold text-sm ${styles.primaryColor} dark:text-white`}
                      >
                        {data.account_name}
                      </p>
                    </div>
                    {/* right section */}
                    <div className="">
                      {visibleBankId === data.id ? (
                        <EyeOff
                          size={20}
                          onClick={() => toggleVisibility(data.id)}
                          className={`${styles.primaryColor} dark:text-white`}
                        />
                      ) : (
                        <Eye
                          size={20}
                          onClick={() => toggleVisibility(data.id)}
                          className={`${styles.primaryColor} dark:text-white`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BankAccounts;
