"use client";

import { useState } from "react";
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
import { Envelope, Eye, EyeSlash } from "@phosphor-icons/react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignUp } from "@/hooks/use-auth";
import { toast } from "sonner";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeEmails: z.boolean(),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: register, isPending } = useSignUp({
    onSuccess: (data, variables) => {
      toast.success("Account created!", {
        description: "Please check your email to verify your account.",
      });
      // Redirect to verify-email page with email
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error: any) => {
      toast.error("Registration failed", {
        description: error.response?.data?.message || "Please try again",
      });
    },
  });

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "US",
      email: "",
      password: "",
      agreeEmails: false,
      agreeTerms: false,
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    register({
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
      rememberMe: true,
      callbackURL: "/onboarding",
    });
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2 text-left">
        <h1 className="text-3xl text-black font-bold">Sign up</h1>
        <p className="text-black/40 md:text-base font-normal">
          Create your account to get started with church management
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
                  <FormLabel className="text-black/80 text-sm">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className="h-11 rounded-sm border-black/10 bg-white focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-black/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
                  <FormLabel className="text-black/80 text-sm">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      className="h-11 rounded-sm border-black/10 bg-white focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-black/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="space-y-1.5 text-left">
                <FormLabel className="text-black/80 text-sm">
                  Country/Area of Residence
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 rounded-sm w-full border-black/10 bg-white focus:ring-1 focus:ring-primary transition-all text-black">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-sm border-black/10">
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CM">Cameroon</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="NG">Nigeria</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5 text-left">
                <FormLabel className="text-black/80 text-sm">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="john.doe@church.com"
                      className="h-11 rounded-sm border-black/10 bg-white pr-10 focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-black/30"
                      {...field}
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40">
                      <Envelope size={18} />
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
              <FormItem className="space-y-1.5 text-left">
                <FormLabel className="text-black/80 text-sm">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 rounded-sm border-black/10 bg-white pr-10 focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-black/30"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 cursor-pointer"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeSlash size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="space-y-2.5">
            <FormField
              control={form.control}
              name="agreeEmails"
              render={({ field }) => (
                <div className="flex items-start space-x-2.5">
                  <Checkbox
                    id="agreeEmails"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 h-4 w-4 border-black/20 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="agreeEmails"
                    className="text-sm font-normal text-black/70 cursor-pointer leading-snug"
                  >
                    I agree to receive email updates
                  </label>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <div className="flex items-start space-x-2.5">
                  <Checkbox
                    id="agreeTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 h-4 w-4 border-black/20 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm font-normal text-black/70 cursor-pointer leading-snug"
                  >
                    I have read and agree to{" "}
                    <span className="text-black">Terms of Service</span>
                  </label>
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-normal transition-all"
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>

          <div className="text-center sm:text-left pt-2">
            <p className="text-sm text-black/60 font-normal">
              Already registered?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
