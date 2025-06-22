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
import { Account, InternalTransfer, Transaction } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  from_account: z.string().min(2),
  to_account: z.string().min(2),
  amount: z.coerce.number().min(0),
  registered_date: z.date(),
});

interface InternalTransferProps {
  initialData: InternalTransfer;
  account: Account[];
}
const InternalTransferForm = ({
  initialData,
  account,
}: InternalTransferProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      from_account: "",
      to_account: "",
      amount: 0,
      registered_date: "",
    },
  });

  const params = useParams();
  const toastMessage = initialData ? "Transfer Updated" : "Transfer Created";
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
        if (values.amount < 0.5) {
          toast.error("Minimum amount you can transfer is 0.5");
          return;
        }
        await axios.patch(
          `/api/internal_transfer/${params.transferId}`,
          values
        );
      } else {
        if (values.amount < 0.5) {
          toast.error("Minimum amount you can transfer is 0.5");
          return;
        }
        await axios.post("/api/internal_transfer", values);
      }
      toast.success(toastMessage);
      router.push("/internal_transfer");
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
            <CardTitle>Internal Transfer</CardTitle>
            <CardDescription>Internal Transfer Creation Form</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-3">
              {/* from account */}
              <FormField
                control={form.control}
                name="from_account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Account</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        defaultValue=""
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="From Account" />
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

              {/* to account */}
              <FormField
                control={form.control}
                name="to_account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Account</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        defaultValue=""
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="To Account" />
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

export default InternalTransferForm;
