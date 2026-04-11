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
import { EnvelopeSimple } from "@phosphor-icons/react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual password reset logic
      console.log("Forgot password values:", values);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
        <div className="space-y-3">
          <h1 className="text-3xl text-black">Check your email</h1>
          <p className="text-black/40 md:text-base leading-relaxed font-normal">
            We&apos;ve sent password reset instructions to your email address.
            Please check your inbox and follow the link to reset your password.
          </p>
        </div>

        <div className="text-center sm:text-left pt-2">
          <p className="text-sm text-black/60 font-normal">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
      <div className="space-y-3">
        <h1 className="text-3xl text-black">Forgot password?</h1>
        <p className="text-black/40 md:text-base leading-relaxed font-normal">
          Enter your email below, you will receive an email with instructions on
          how to reset your password in a few minutes.
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
                      className="h-11 rounded-sm border-black/10 bg-white pr-10 focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-black/30"
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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary hover:bg-primary-dark text-white rounded-none font-normal transition-all"
          >
            {isLoading ? "Sending..." : "Start recovery"}
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
