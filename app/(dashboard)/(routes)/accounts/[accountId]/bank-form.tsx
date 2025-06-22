"use client";
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
import { styles } from "@/app/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { FacilityAccounts } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
const formSchema = z.object({
  account_name: z.string().min(2),
});

interface AccountProps {
  initialData: FacilityAccounts;
}
const AccountForm = ({ initialData }: AccountProps) => {
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      account_name: "",
    },
  });
  const params = useParams();
  const toastMessage = initialData ? "Account Updated" : "Account Created";
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/accounts/${params.accountId}`, {
          info: { values, userId },
        });
        console.log(values);
      } else {
        const data = await axios.post("/api/accounts", {
          info: { values, userId },
        });
        console.log(values);
      }
      toast.success(toastMessage);
      router.push("/accounts");
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
        <Card className="dark:bg-transparent">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Account Creation Form</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:gap-y-5">
              <FormField
                control={form.control}
                name="account_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter account name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>

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

export default AccountForm;
