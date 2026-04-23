"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ICountry, IState, ICity, Country, State } from "country-state-city";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Loader } from "@/components/ui/loader";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  CountrySelector,
  StateSelector,
  CitySelector,
} from "@/components/ui/location-selector";
import type { Branch, CreateBranchRequest, UpdateBranchRequest } from "@/types/branches";

const branchFormSchema = z.object({
  name: z.string().min(2, "Branch name must be at least 2 characters"),
  address: z.string().min(5, "Please enter a complete address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  zipCode: z.string().min(4, "Zip code is required"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type BranchFormData = z.infer<typeof branchFormSchema>;

interface BranchFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateBranchRequest | UpdateBranchRequest) => void;
  branch?: Branch;
  isLoading?: boolean;
}

export function BranchFormDialog({
  open,
  onOpenChange,
  onSubmit,
  branch,
  isLoading = false,
}: BranchFormDialogProps) {
  const isEditing = !!branch;
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
      website: "",
    },
  });

  // Initialize default country (Cameroon) for new branches
  useEffect(() => {
    if (open && !branch && !selectedCountryCode) {
      console.log('[BranchFormDialog] Initializing default country (Cameroon)');
      const cameroon = Country.getCountryByCode("CM");
      if (cameroon) {
        setSelectedCountryCode(cameroon.isoCode);
        form.setValue("country", cameroon.name);
      }
    }
  }, [open, branch, selectedCountryCode, form]);

  // Reset form when branch changes or dialog opens/closes
  useEffect(() => {
    console.log('[BranchFormDialog] useEffect triggered - open:', open, 'branch:', branch);
    if (open) {
      if (branch) {
        console.log('[BranchFormDialog] Editing existing branch:', branch);
        form.reset({
          name: branch.name,
          address: branch.address,
          city: branch.city,
          state: branch.state,
          country: branch.country,
          zipCode: branch.zipCode,
          phoneNumber: branch.phoneNumber,
          email: branch.email,
          website: branch.website,
        });
        
        // Find and set country code for location selectors
        const countries = Country.getAllCountries();
        const foundCountry = countries.find(c => c.name === branch.country);
        console.log('[BranchFormDialog] Found country:', foundCountry, 'for country name:', branch.country);
        if (foundCountry) {
          setSelectedCountryCode(foundCountry.isoCode);
          
          // Find and set state code
          const states = State.getStatesOfCountry(foundCountry.isoCode);
          const foundState = states.find(s => s.name === branch.state);
          console.log('[BranchFormDialog] Found state:', foundState, 'for state name:', branch.state, 'in country:', foundCountry.isoCode);
          if (foundState) {
            setSelectedStateCode(foundState.isoCode);
          }
        }
      } else {
        console.log('[BranchFormDialog] Creating new branch');
        form.reset({
          name: "",
          address: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
          phoneNumber: "",
          email: "",
          website: "",
        });
        setSelectedCountryCode("");
        setSelectedStateCode("");
      }
    }
  }, [open, branch, form]);

  const handleSubmit = (data: BranchFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit Branch" : "Add New Branch"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            {isEditing
              ? "Update the branch information below."
              : "Fill in the details to create a new branch."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Branch Name <span className="text-red-500">*</span>
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
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="branch@church.org"
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
                        Phone Number <span className="text-red-500">*</span>
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
                        Street Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="456 Earth Rd, Muddy Town"
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
                          Country <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <CountrySelector
                            value={field.value}
                            onChange={(country: ICountry | null) => {
                              console.log('[CountrySelector] Selected country:', country);
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
                          State/Province <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <StateSelector
                            countryCode={selectedCountryCode}
                            value={field.value}
                            onChange={(state: IState | null) => {
                              console.log('[StateSelector] Selected state:', state, 'Country code:', selectedCountryCode);
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
                          City <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <CitySelector
                            countryCode={selectedCountryCode}
                            stateCode={selectedStateCode}
                            value={field.value}
                            onChange={(city: ICity | null) => {
                              console.log('[CitySelector] Selected city:', city, 'State code:', selectedStateCode, 'Country code:', selectedCountryCode);
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
                          Zip/Postal Code <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="10001" 
                            {...field} 
                            className="h-11" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Website (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://church.org/location"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading && <Loader className="w-4 h-4 mr-2" />}
                {isEditing ? "Update Branch" : "Create Branch"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}