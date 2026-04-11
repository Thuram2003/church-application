"use client";

import { Gear } from "@phosphor-icons/react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DefaultsTab() {
  const [defaultPronouns, setDefaultPronouns] = useState(false);
  const [genderOption, setGenderOption] = useState("basic");
  const [defaultGender, setDefaultGender] = useState("male");
  const [ageGroups, setAgeGroups] = useState({
    child: true,
    adult: true,
    elder: true,
  });
  const [defaultAgeGroup, setDefaultAgeGroup] = useState("adult");
  const [defaultCurrency, setDefaultCurrency] = useState("xaf");
  const [currencyFormat, setCurrencyFormat] = useState("fr-CM");
  const [defaultTimezone, setDefaultTimezone] = useState("africa-douala");
  const [defaultCountryCode, setDefaultCountryCode] = useState("cm");
  const [portalMemberDirectory, setPortalMemberDirectory] = useState(true);

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">
          Account Defaults
        </h2>
        <p className="text-sm text-gray-600">
          Customize your church's default values to save time and ensure consistency across your account.
        </p>
      </div>

      {/* Default Person Settings */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            Default Person Settings
          </h3>
          <p className="text-sm text-gray-600">
            Set your church's default values for new people and profiles to keep your data consistent and onboarding faster
          </p>
        </div>

        {/* Default Pronouns */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <Label className="text-sm font-medium text-gray-900">
              Default Pronouns
            </Label>
          </div>
          <Switch
            checked={defaultPronouns}
            onCheckedChange={setDefaultPronouns}
          />
        </div>

        {/* Gender Options */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-gray-900 mb-2 block">
              Gender Options
            </Label>
            <p className="text-sm text-gray-600 mb-4">
              Select a preset list of gender options for your church to use in person profiles.
            </p>
          </div>

          <RadioGroup value={genderOption} onValueChange={setGenderOption}>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors">
                <RadioGroupItem value="basic" id="basic" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="basic" className="text-sm font-medium cursor-pointer">
                    Basic
                  </Label>
                  <p className="text-sm text-gray-500">Male, Female</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors">
                <RadioGroupItem value="simple" id="simple" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="simple" className="text-sm font-medium cursor-pointer">
                    Simple
                  </Label>
                  <p className="text-sm text-gray-500">Male, Female, Unspecified</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors">
                <RadioGroupItem value="expanded" id="expanded" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="expanded" className="text-sm font-medium cursor-pointer">
                    Expanded
                  </Label>
                  <p className="text-sm text-gray-500">
                    Male, Female, Unspecified, Prefer Not to Say
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors">
                <RadioGroupItem value="full" id="full" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="full" className="text-sm font-medium cursor-pointer">
                    Full List
                  </Label>
                  <p className="text-sm text-gray-500">
                    Male, Female, Unspecified, Prefer Not to Say, Non-binary, Gender non-conforming, Transgender, Other
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Default Gender */}
        <div className="space-y-2">
          <Label htmlFor="default-gender" className="text-sm font-medium">
            Default Gender
          </Label>
          <Select value={defaultGender} onValueChange={setDefaultGender}>
            <SelectTrigger id="default-gender" className="max-w-md h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="unspecified">Unspecified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Groups */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-gray-900 mb-2 block">
              Age Groups
            </Label>
            <p className="text-sm text-gray-600 mb-4">
              Enable or disable age group options for your church.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
              <Label className="text-sm font-medium">Child</Label>
              <Switch
                checked={ageGroups.child}
                onCheckedChange={(checked) =>
                  setAgeGroups({ ...ageGroups, child: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
              <Label className="text-sm font-medium">Adult</Label>
              <Switch
                checked={ageGroups.adult}
                onCheckedChange={(checked) =>
                  setAgeGroups({ ...ageGroups, adult: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
              <Label className="text-sm font-medium">Elder</Label>
              <Switch
                checked={ageGroups.elder}
                onCheckedChange={(checked) =>
                  setAgeGroups({ ...ageGroups, elder: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Default Age Group */}
        <div className="space-y-2">
          <Label htmlFor="default-age-group" className="text-sm font-medium">
            Default Age Group
          </Label>
          <Select value={defaultAgeGroup} onValueChange={setDefaultAgeGroup}>
            <SelectTrigger id="default-age-group" className="max-w-md h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="child">Child</SelectItem>
              <SelectItem value="adult">Adult</SelectItem>
              <SelectItem value="elder">Elder</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Localization Settings */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-6">
        <h3 className="text-base font-semibold text-gray-900">
          Localization Settings
        </h3>

        {/* Default Currency */}
        <div className="space-y-2">
          <Label htmlFor="default-currency" className="text-sm font-medium">
            Default Currency
          </Label>
          <p className="text-sm text-gray-600 mb-2">
            Used across online giving, funds, events, and forms.
          </p>
          <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
            <SelectTrigger id="default-currency" className="max-w-md h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xaf">Central African CFA Franc (XAF)</SelectItem>
              <SelectItem value="usd">US Dollar $ (USD)</SelectItem>
              <SelectItem value="eur">Euro € (EUR)</SelectItem>
              <SelectItem value="gbp">British Pound £ (GBP)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Currency Format */}
        <div className="space-y-2">
          <Label htmlFor="currency-format" className="text-sm font-medium">
            Currency Format
          </Label>
          <p className="text-sm text-gray-600 mb-2">
            Choose the formatting style for this currency.
          </p>
          <Select value={currencyFormat} onValueChange={setCurrencyFormat}>
            <SelectTrigger id="currency-format" className="max-w-md h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr-CM">fr-CM (1.234,56 FCFA)</SelectItem>
              <SelectItem value="en-US">en-US ($1,234.56)</SelectItem>
              <SelectItem value="fr-FR">fr-FR (1 234,56 €)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Default Timezone */}
        <div className="space-y-2">
          <Label htmlFor="default-timezone" className="text-sm font-medium">
            Default Timezone
          </Label>
          <p className="text-sm text-gray-600 mb-2">
            Applied across events, reminders, calendar views, and email/SMS scheduling.
          </p>
          <Select value={defaultTimezone} onValueChange={setDefaultTimezone}>
            <SelectTrigger id="default-timezone" className="max-w-md h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="africa-douala">Africa/Douala (UTC+01:00)</SelectItem>
              <SelectItem value="america-new-york">America/New York (UTC-05:00)</SelectItem>
              <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
              <SelectItem value="europe-paris">Europe/Paris (UTC+01:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Communication Settings */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-6">
        <h3 className="text-base font-semibold text-gray-900">
          Communication Settings
        </h3>

        {/* Default Country Code */}
        <div className="space-y-2">
          <Label htmlFor="default-country-code" className="text-sm font-medium">
            Default Country Code
          </Label>
          <p className="text-sm text-gray-600 mb-2">
            Pre-fill the country code when adding phone numbers.
          </p>
          <Select value={defaultCountryCode} onValueChange={setDefaultCountryCode}>
            <SelectTrigger id="default-country-code" className="max-w-md h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cm">🇨🇲 +237 Cameroon</SelectItem>
              <SelectItem value="us">🇺🇸 +1 United States</SelectItem>
              <SelectItem value="gb">🇬🇧 +44 United Kingdom</SelectItem>
              <SelectItem value="fr">🇫🇷 +33 France</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Portal Settings */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-6">
        <h3 className="text-base font-semibold text-gray-900">
          Portal Settings
        </h3>

        {/* Portal Member Directory */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Label className="text-sm font-medium text-gray-900 block mb-1">
              Portal Member Directory
            </Label>
            <p className="text-sm text-gray-600">
              Allow members to view directory of other members.
            </p>
          </div>
          <Switch
            checked={portalMemberDirectory}
            onCheckedChange={setPortalMemberDirectory}
          />
        </div>
      </div>
    </div>
  );
}
