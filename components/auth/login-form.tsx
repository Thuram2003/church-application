"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EnvelopeSimple, Eye, EyeSlash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      console.log("Login values:", values);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to home after successful login
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl text-black">Sign in</h1>
        <p className="text-black/40 md:text-base font-normal">
          Welcome back! Please enter your details to access your account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-black/80 text-sm">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="john.doe@church.com"
                      className="h-11 border-black/10 bg-white pr-10 focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-black/30"
                      {...field}
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40">
                      <EnvelopeSimple size={20} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-black/80 text-sm">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 border-black/10 bg-white pr-10 focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-black/30"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 cursor-pointer"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-4 w-4 border-black/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-normal text-black/60 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-sm text-black hover:text-primary transition-colors"
            >
              Recover password
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-normal transition-all"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-center sm:text-left pt-2">
            <p className="text-sm text-black/60 font-normal">
              You don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
