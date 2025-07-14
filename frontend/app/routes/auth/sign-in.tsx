import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "~/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "~/hook/use-auth";
import { toast } from "sonner";

type SignInformData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const form = useForm<SignInformData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginMutation();

  const handleOnSubmit = (vaues: SignInformData) => {
    mutate(vaues, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Login successful");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        // Handle error, e.g., show error message
        const errorMessage = error?.response?.data?.message || "Login failed";
        console.error(error);
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="max-w-md w-full  shadow-lg ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {" "}
            Sign in to your account to continue{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className=" flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className=" text-xs  text-blue-600"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-500">
                Sign In
              </Button>
            </form>
          </Form>
          <CardFooter className="flex flex-col items-center">
            <div className="flex flex-col items-center mt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/sign-up" className="font-bold text-black">
                  Sign Up
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
