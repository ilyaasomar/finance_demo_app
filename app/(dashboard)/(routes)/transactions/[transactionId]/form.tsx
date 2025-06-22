"use client";
import { styles } from "@/app/styles";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, Category, Transaction } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  transaction_type: z.string().min(2),
  category_id: z.string().min(2),
  amount: z.coerce.number().min(0),
  account_id: z.string().min(2),
  description: z.string().optional(),
  registered_date: z.date(),
});

interface TransactionProps {
  initialData: Transaction;
  category: Category[];
  account: Account[];
}
const TransactionForm = ({
  initialData,
  category,
  account,
}: TransactionProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // @ts-ignore
    defaultValues: initialData || {
      transaction_type: "",
      category_id: "",
      amount: 0,
      account_id: "",
      description: "",
      registered_date: "",
    },
  });

  const params = useParams();
  const toastMessage = initialData
    ? "Transaction Updated"
    : "Transaction Created";
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //  Check if registered_date is a valid date object
      if (
        values.registered_date instanceof Date &&
        // @ts-ignore
        !isNaN(values.registered_date)
      ) {
        // Convert registered_date to UTC format
        values.registered_date.setMinutes(
          values.registered_date.getMinutes() -
            values.registered_date.getTimezoneOffset()
        );
        // @ts-ignore
        values.registered_date = values.registered_date.toISOString();
      }

      if (initialData) {
        if (values.amount < 0.1) {
          toast.error("Minimum amount is 0.01");
          return;
        }
        await axios.patch(`/api/transactions/${params.transactionId}`, values);
      } else {
        if (values.amount < 0.1) {
          toast.error("Minimum amount is 0.1");
          return;
        }
        await axios.post("/api/transactions", values);
      }
      toast.success(toastMessage);
      router.push("/transactions");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="dark:bg-transparent">
          <CardHeader>
            <CardTitle>Transaction</CardTitle>
            <CardDescription>Transaction Creation Form</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-3">
              <FormField
                control={form.control}
                name="transaction_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        defaultValue=""
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Transaction Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="overflow-y-auto max-h-[30rem]">
                          {category.map((cat) => (
                            <SelectItem value={cat.id} key={cat.id}>
                              {cat.category_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        defaultValue=""
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Account" />
                        </SelectTrigger>
                        <SelectContent>
                          {account.map((acc) => (
                            <SelectItem value={acc.id} key={acc.id}>
                              {acc.bank_name}{" "}
                              <span className="font-bold">##</span>{" "}
                              {acc.account_number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter description"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registered_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            disabled={isSubmitting}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2020-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={`${styles.primaryBgColor} dark:bg-white dark:text-black`}
              disabled={!isValid || isSubmitting}
            >
              {initialData ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default TransactionForm;
