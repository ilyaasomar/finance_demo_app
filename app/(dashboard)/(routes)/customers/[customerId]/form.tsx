"use client";
import { styles } from "@/app/styles";
import { Button } from "@/components/ui/button";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as z from "zod";

const formSchema = z.object({
  customer_name: z.string().min(2),
  phone: z.string().min(2),
  address: z.string().min(2),
});
interface CustomerFormProps {
  initialData: Customer;
}
const CustomerForm = ({ initialData }: CustomerFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      customer_name: "",
      phone: "",
      address: "",
    },
  });

  const router = useRouter();
  const params = useParams();
  const toastMessage = initialData ? "Customer Updated!" : "Customer Created!";
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/customers/${params.customerId}`, values);
        console.log(values);
      } else {
        await axios.post("/api/customers", values);
        console.log(values);
      }
      toast.success(toastMessage);
      router.push("/customers");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      form.reset();
    }
  };
  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col w-1/2 gap-y-5">
          <Card className="dark:bg-transparent">
            <CardHeader>
              <CardTitle>Customer</CardTitle>
              <CardDescription>Customer Creation Form</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter customer name"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter customer address"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
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
        </div>
      </form>
    </Form>
  );
};

export default CustomerForm;
