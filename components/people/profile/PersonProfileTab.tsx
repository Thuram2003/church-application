"use client";

import {
  User,
  PencilSimple,
  Envelope,
  Phone,
  MapPin,
  Calendar,
  GenderIntersex,
  Users,
  House,
  IdentificationCard,
  FirstAid,
  Cake,
  Briefcase,
  GraduationCap,
  Translate,
  Heart,
  Warning,
  ForkKnife,
  Notepad,
  Drop,
  Buildings,
  MapTrifold,
  Globe,
  Hash,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { CountrySelector, StateSelector, CitySelector } from "@/components/ui/location-selector";
import { FormSkeleton } from "@/components/ui/skeleton";
import { usePerson } from "@/hooks/use-people";
import type { ICountry, IState, ICity } from "country-state-city";

interface PersonProfileTabProps {
  personId: string;
}

export function PersonProfileTab({ personId }: PersonProfileTabProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { data: response, isLoading } = usePerson(personId);
  const person = response?.data;

  // Location state
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emergencyPhone, setEmergencyPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

  const handleEditStart = (section: string) => {
    setEditingSection(section);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <div className="space-y-6">
          <FormSkeleton fields={3} />
          <FormSkeleton fields={3} />
        </div>
        <div className="space-y-6">
          <FormSkeleton fields={3} />
          <FormSkeleton fields={2} />
        </div>
        <div className="space-y-6">
          <FormSkeleton fields={3} />
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Person not found</p>
      </div>
    );
  }

  const name = person.user?.name || "Unknown";
  const isEditingPersonal = editingSection === "personal";
  const isEditingContact = editingSection === "contact";
  const isEditingAdditional = editingSection === "additional";
  const isEditingHealth = editingSection === "health";
  const isEditingFamily = editingSection === "family";

  return (
    <div className="py-6">
      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Personal Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Personal details
                </h3>
              </div>
              {!isEditingPersonal && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStart("personal")}
                  className="h-7 px-2"
                >
                  <PencilSimple className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {/* Full Name */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Full name</span>
                </div>
                <div>
                  {isEditingPersonal ? (
                    <Input defaultValue={name} className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{name}</p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <GenderIntersex className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Gender</span>
                </div>
                <div>
                  {isEditingPersonal ? (
                    <Select defaultValue={person.gender}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{person.gender}</p>
                  )}
                </div>
              </div>

              {/* Birthday */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Cake className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Birthday</span>
                </div>
                <div>
                  {isEditingPersonal ? (
                    <Input type="date" className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Age Group */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Age group</span>
                </div>
                <div>
                  {isEditingPersonal ? (
                    <Select defaultValue={person.ageGroup}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Youth">Youth</SelectItem>
                        <SelectItem value="Adult">Adult</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900 py-2">
                      {person.ageGroup || "—"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isEditingPersonal && (
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} size="sm" className="h-8 text-xs">
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel} className="h-8 text-xs">
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Contact Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Envelope className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Contact details
                </h3>
              </div>
              {!isEditingContact && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStart("contact")}
                  className="h-7 px-2"
                >
                  <PencilSimple className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {/* Email */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Envelope className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Email</span>
                </div>
                <div>
                  {isEditingContact ? (
                    <Input
                      type="email"
                      defaultValue={person.user?.email}
                      className="h-9 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">
                      {person.user?.email || "—"}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Phone</span>
                </div>
                <div>
                  {isEditingContact ? (
                    <PhoneInput
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber((value as string) || "")}
                      defaultCountry="CM"
                      className="h-9"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{phoneNumber || "—"}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Address</span>
                </div>
                <div>
                  {isEditingContact ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* City */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Buildings className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">City</span>
                </div>
                <div>
                  {isEditingContact ? (
                    <CitySelector
                      countryCode={selectedCountry?.isoCode}
                      stateCode={selectedState?.isoCode}
                      value={selectedCity?.name}
                      onChange={setSelectedCity}
                      className="h-9"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{selectedCity?.name || "—"}</p>
                  )}
                </div>
              </div>

              {/* State */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <MapTrifold className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">State</span>
                </div>
                <div>
                  {isEditingContact ? (
                    <StateSelector
                      countryCode={selectedCountry?.isoCode}
                      value={selectedState?.name}
                      onChange={(state) => {
                        setSelectedState(state);
                        setSelectedCity(null); // Reset city when state changes
                      }}
                      className="h-9"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{selectedState?.name || "—"}</p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Country</span>
                </div>
                <div>
                  {isEditingContact ? (
                    <CountrySelector
                      value={selectedCountry?.name}
                      onChange={(country) => {
                        setSelectedCountry(country);
                        setSelectedState(null); // Reset state when country changes
                        setSelectedCity(null); // Reset city when country changes
                      }}
                      className="h-9"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{selectedCountry?.name || "—"}</p>
                  )}
                </div>
              </div>

              {/* Zip code */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Zip code</span>
                </div>
                <div>
                  {isEditingContact ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>
            </div>

            {isEditingContact && (
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} size="sm" className="h-8 text-xs">
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel} className="h-8 text-xs">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Additional Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <IdentificationCard className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Additional details
                </h3>
              </div>
              {!isEditingAdditional && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStart("additional")}
                  className="h-7 px-2"
                >
                  <PencilSimple className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {/* Occupation */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Occupation</span>
                </div>
                <div>
                  {isEditingAdditional ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Educational level */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Education</span>
                </div>
                <div>
                  {isEditingAdditional ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Language */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Translate className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Language</span>
                </div>
                <div>
                  {isEditingAdditional ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Marital Status */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Marital status</span>
                </div>
                <div>
                  {isEditingAdditional ? (
                    <Select>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Baptized at */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Baptized at</span>
                </div>
                <div>
                  {isEditingAdditional ? (
                    <Input type="date" className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Joined church */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Joined</span>
                </div>
                <div>
                  <p className="text-sm text-gray-900 py-2">
                    {new Date(person.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {isEditingAdditional && (
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} size="sm" className="h-8 text-xs">
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel} className="h-8 text-xs">
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Family Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <House className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Family</h3>
            </div>

            <div className="space-y-3">
              {/* Connected Family */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Family</span>
                </div>
                <div>
                  {person.familyId ? (
                    <div className="flex items-center gap-2 py-1">
                      <Badge
                        variant="secondary"
                        className="bg-primary-light text-primary border-primary-lighter text-xs"
                      >
                        Mbaku
                      </Badge>
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs">
                        Open
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 py-2">
                      Not connected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          {/* Health Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FirstAid className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Health details
                </h3>
              </div>
              {!isEditingHealth && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStart("health")}
                  className="h-7 px-2"
                >
                  <PencilSimple className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {/* Allergies */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Warning className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Allergies</span>
                </div>
                <div>
                  {isEditingHealth ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Emergency name */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Emergency</span>
                </div>
                <div>
                  {isEditingHealth ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Emergency phone */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Emerg. phone</span>
                </div>
                <div>
                  {isEditingHealth ? (
                    <PhoneInput
                      value={emergencyPhone}
                      onChange={(value) => setEmergencyPhone((value as string) || "")}
                      defaultCountry="CM"
                      className="h-9"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{emergencyPhone || "—"}</p>
                  )}
                </div>
              </div>

              {/* Emergency email */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Envelope className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Emerg. email</span>
                </div>
                <div>
                  {isEditingHealth ? (
                    <Input type="email" className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Eating preferences */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <ForkKnife className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Diet</span>
                </div>
                <div>
                  {isEditingHealth ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Medical notes */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Notepad className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Medical notes</span>
                </div>
                <div>
                  {isEditingHealth ? (
                    <Input className="h-9 text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>

              {/* Blood type */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                <div className="pt-2 flex items-center gap-1.5">
                  <Drop className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">Blood type</span>
                </div>
                <div>
                  {isEditingHealth ? (
                    <Select>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900 py-2">—</p>
                  )}
                </div>
              </div>
            </div>

            {isEditingHealth && (
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} size="sm" className="h-8 text-xs">
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel} className="h-8 text-xs">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
