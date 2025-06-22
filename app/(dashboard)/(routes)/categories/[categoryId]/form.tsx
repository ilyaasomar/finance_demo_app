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
import { Category } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as z from "zod";

const formSchema = z.object({
  category_name: z.string().min(2),
});
interface CategoryFormProps {
  initialData: Category;
}
const CatgoryForm = ({ initialData }: CategoryFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      category_name: "",
    },
  });

  const router = useRouter();
  const params = useParams();
  const toastMessage = initialData ? "Category Updated!" : "Category Created!";
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/categories/${params.categoryId}`, values);
      } else {
        await axios.post("/api/categories", values);
      }
      toast.success(toastMessage);
      router.push("/categories");
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
              <CardTitle>Category</CardTitle>
              <CardDescription>Category Creation Form</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
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

export default CatgoryForm;
