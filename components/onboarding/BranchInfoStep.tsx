"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ICountry, IState, ICity } from "country-state-city";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CountrySelector,
  StateSelector,
  CitySelector,
} from "@/components/ui/location-selector";

const branchInfoSchema = z.object({
  name: z.string().min(2, "Branch name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a complete address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  zipCode: z.string().min(4, "Zip code is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type BranchInfoData = z.infer<typeof branchInfoSchema>;

interface BranchInfoStepProps {
  onNext: (data: BranchInfoData) => void;
  onBack: () => void;
  initialData?: Partial<BranchInfoData>;
  isSubmitting?: boolean;
}

export function BranchInfoStep({
  onNext,
  onBack,
  initialData,
  isSubmitting = false,
}: BranchInfoStepProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");

  const form = useForm<BranchInfoData>({
    resolver: zodResolver(branchInfoSchema),
    defaultValues: initialData || {
      name: "Main Branch",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      website: "",
    },
  });

  const onSubmit = (data: BranchInfoData) => {
    onNext(data);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Set Up Your Main Branch
        </h1>
        <p className="text-gray-500">
          Configure your headquarters location and contact details
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Branch Name
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Main Branch" 
                    {...field} 
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="info@yourchurch.com"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    international
                    defaultCountry="CM"
                    value={field.value}
                    onChange={field.onChange}
                    className="h-11"
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
                <FormLabel className="text-sm font-medium text-gray-700">
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Church Street"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Country
                  </FormLabel>
                  <FormControl>
                    <CountrySelector
                      value={field.value}
                      onChange={(country: ICountry | null) => {
                        if (country) {
                          field.onChange(country.name);
                          setSelectedCountryCode(country.isoCode);
                          setSelectedStateCode("");
                          form.setValue("state", "");
                          form.setValue("city", "");
                        }
                      }}
                      defaultCountryCode="CM"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    State/Province
                  </FormLabel>
                  <FormControl>
                    <StateSelector
                      countryCode={selectedCountryCode}
                      value={field.value}
                      onChange={(state: IState | null) => {
                        if (state) {
                          field.onChange(state.name);
                          setSelectedStateCode(state.isoCode);
                          form.setValue("city", "");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    City
                  </FormLabel>
                  <FormControl>
                    <CitySelector
                      countryCode={selectedCountryCode}
                      stateCode={selectedStateCode}
                      value={field.value}
                      onChange={(city: ICity | null) => {
                        if (city) {
                          field.onChange(city.name);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Zip/Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 h-11 font-medium"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 h-11 font-medium"
            >
              {isSubmitting ? "Creating..." : "Complete Setup"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
