"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import { FaGoogle } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SpinnerLoader } from "@/components/spinner";

const formSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(2),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        } else if (callback?.ok) {
          toast.success("Success Login!");
          router.push("/");
          router.refresh();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
      <Card className="dark:bg-transparent">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login an account</CardTitle>
              <CardDescription>
                Enter your email and password below to login your account
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              {/* start upper part */}
              {/* <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline">
                  <FaGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground z-10">
                    Or continue with
                  </span>
                </div>
              </div> */}

              {/* end upper part */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full outline bg-[#111827] dark:bg-white"
                disabled={loading}
              >
                {loading ? <SpinnerLoader /> : "Login"}
              </Button>
            </CardContent>
            <Separator />
          </form>
        </Form>

        <div className="flex items-center justify-center gap-x-5 my-4">
          <button
            disabled={loading}
            className="cursor-pointer font-semibold text-sm"
            onClick={() => router.push("/register")}
          >
            Not have an account? Sign Up
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
