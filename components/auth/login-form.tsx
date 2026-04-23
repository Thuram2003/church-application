"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
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
import { Envelope, Eye, EyeSlash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsPending(true);

    try {
      console.log('[Login Form] Step 1: Calling Better Auth directly to set session cookie...');
      
      // Step 1: Call Better Auth directly from the client to set the session cookie
      const betterAuthResponse = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/sign-in/email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important: This ensures cookies are set
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
          }),
        }
      );

      if (!betterAuthResponse.ok) {
        const errorData = await betterAuthResponse.json();
        console.error('[Login Form] Better Auth login failed:', errorData);
        
        // Check if email is not verified
        if (errorData.code === "EMAIL_NOT_VERIFIED" || errorData.message?.includes("verify") || errorData.message?.includes("not verified")) {
          toast.error("Email not verified", {
            description: "Please verify your email before signing in.",
          });
          router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
          return;
        }
        
        toast.error("Login failed", {
          description: errorData.message || "Invalid email or password",
        });
        return;
      }

      const betterAuthData = await betterAuthResponse.json();
      console.log('[Login Form] Better Auth login successful, cookie should be set');
      console.log('[Login Form] Better Auth response:', betterAuthData);

      // Check if email is verified
      if (!betterAuthData.user?.emailVerified) {
        toast.error("Email not verified", {
          description: "Please verify your email before signing in.",
        });
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
        return;
      }

      // Step 2: Now call NextAuth to sync the session
      console.log('[Login Form] Step 2: Syncing with NextAuth...');
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe.toString(),
        redirect: false,
      });

      console.log('[Login Form] NextAuth result:', result);

      if (result?.error) {
        console.error('[Login Form] NextAuth sync failed:', result.error);
        toast.error("Login failed", {
          description: result.error || "Failed to sync session",
        });
        return;
      }

      if (result?.ok) {
        console.log('[Login Form] Login successful, redirecting to workspace selection');
        
        toast.success("Welcome back!", {
          description: "Loading your workspaces...",
        });
        
        // Redirect to workspace selection
        router.push("/workspace-selection");
        router.refresh();
      }
    } catch (error: any) {
      console.error('[Login Form] Unexpected error:', error);
      toast.error("Login failed", {
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl text-black font-bold">Sign in</h1>
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
                      <Envelope size={20} />
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
            disabled={isPending}
            className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-normal transition-all"
          >
            {isPending ? "Signing in..." : "Sign in"}
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
