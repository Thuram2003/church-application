"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const churchInfoSchema = z.object({
  name: z.string().min(2, "Church name must be at least 2 characters"),
  denomination: z.string().min(2, "Denomination is required"),
});

export type ChurchInfoData = z.infer<typeof churchInfoSchema>;

interface ChurchInfoStepProps {
  onNext: (data: ChurchInfoData) => void;
  initialData?: Partial<ChurchInfoData>;
}

const denominations = [
  "Baptist",
  "Catholic",
  "Methodist",
  "Presbyterian",
  "Lutheran",
  "Pentecostal",
  "Non-denominational",
  "Anglican/Episcopal",
  "Assemblies of God",
  "Church of Christ",
  "Seventh-day Adventist",
  "Orthodox",
  "Reformed",
  "Evangelical",
  "Other",
];

export function ChurchInfoStep({ onNext, initialData }: ChurchInfoStepProps) {
  const form = useForm<ChurchInfoData>({
    resolver: zodResolver(churchInfoSchema),
    defaultValues: initialData || {
      name: "",
      denomination: "",
    },
  });

  const onSubmit = (data: ChurchInfoData) => {
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
          Welcome to Movementz
        </h1>
        <p className="text-gray-500">
          Let's start by setting up your church profile
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
                  Church Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Grace Community Church"
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
            name="denomination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Denomination
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your denomination" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {denominations.map((denom) => (
                      <SelectItem key={denom} value={denom}>
                        {denom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6">
            <Button 
              type="submit" 
              className="w-full h-11 font-medium"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
