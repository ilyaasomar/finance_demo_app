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
import { Account, Customer, JournalEntry, Supplier } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  entry_type: z.string().min(2),
  customer_or_supplier_id: z.string().min(2),
  bank_account_id: z.string().min(2),
  amount: z.coerce.number().min(0),
  description: z.string().optional(),
  registered_date: z.date(),
});

interface EntryProps {
  initialData: JournalEntry;
  customer: Customer[];
  supplier: Supplier[];
  bank_account: Account[];
}
const EntryForm = ({
  initialData,
  customer,
  supplier,
  bank_account,
}: EntryProps) => {
  const router = useRouter();

  // Determine the initial entryType based on the initialData
  const [entryType, setEntryType] = useState<"customer" | "supplier">(
    (initialData?.entry_type as "customer" | "supplier") || "customer"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry_type: initialData?.entry_type || "customer",
      customer_or_supplier_id: initialData
        ? initialData.customer_id || initialData.supplier_id || ""
        : "",
      bank_account_id: "",
      amount: initialData?.amount || 0,
      description: initialData?.description || "",
      registered_date: initialData?.registered_date
        ? new Date(initialData.registered_date)
        : undefined,
    },
  });

  const params = useParams();
  useEffect(() => {
    if (initialData?.entry_type) {
      setEntryType(initialData.entry_type as "customer" | "supplier");
    }
  }, [initialData]);

  const toastMessage = initialData
    ? "Payment Entry Updated"
    : "Payment Entry Created";

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

        // await axios.patch(`/api/payment_entry/${params.entryId}`, values);
      } else {
        if (values.amount < 0.1) {
          toast.error("Minimum amount is 0.1");
          return;
        }
        console.log(values);
        await axios.post("/api/payment_entry", values);
      }
      toast.success(toastMessage);
      router.push("/payment_entry");
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
            <CardTitle>Payment Entry</CardTitle>
            <CardDescription>Payment Entry Creation Form</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-3">
              <FormField
                control={form.control}
                name="entry_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Type</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value || "customer"}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Entry Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="supplier">Supplier</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_or_supplier_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {form.getValues("entry_type") === "customer"
                        ? "Customer"
                        : "Supplier"}
                    </FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select ${
                              form.getValues("entry_type") === "customer"
                                ? "Customer"
                                : "Supplier"
                            }`}
                          />
                        </SelectTrigger>
                        <SelectContent className="overflow-y-auto max-h-[30rem]">
                          {form.getValues("entry_type") === "customer"
                            ? customer.map((cust) => (
                                <SelectItem value={cust.id} key={cust.id}>
                                  {cust.customer_name}
                                </SelectItem>
                              ))
                            : supplier.map((supp) => (
                                <SelectItem value={supp.id} key={supp.id}>
                                  {supp.supplier_name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  */}

              <FormField
                control={form.control}
                name="bank_account_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Account" />
                        </SelectTrigger>
                        <SelectContent className="overflow-y-auto max-h-[30rem]">
                          {bank_account.map((acc) => (
                            <SelectItem value={acc.id} key={acc.id}>
                              {acc.account_name} {"#"} {acc.account_number}
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

export default EntryForm;
