"use client";

import {
  UserCircle,
  PencilSimple,
  EnvelopeSimple,
  Phone,
  MapPin,
  CalendarDots,
  GenderIntersex,
  UsersThree,
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
  Check,
  X,
  Crown,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  CountrySelector,
  StateSelector,
  CitySelector,
} from "@/components/ui/location-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerson } from "@/hooks/use-people";
import { useFamily } from "@/hooks/use-families";
import type { ICountry, IState, ICity } from "country-state-city";

interface PersonProfileTabProps {
  personId: string;
}

// ── Reusable field row ──────────────────────────────────────────────────────
function FieldRow({
  icon: Icon,
  label,
  value,
  editing,
  children,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
  editing?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-1.5 w-28 flex-shrink-0 pt-0.5">
        <Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <div className="flex-1 min-w-0">
        {editing && children ? (
          children
        ) : (
          <p className="text-sm text-gray-900">{value || "—"}</p>
        )}
      </div>
    </div>
  );
}

// ── Section card ────────────────────────────────────────────────────────────
function Section({
  icon: Icon,
  title,
  sectionKey,
  editingSection,
  onEdit,
  onSave,
  onCancel,
  children,
}: {
  icon: React.ElementType;
  title: string;
  sectionKey: string;
  editingSection: string | null;
  onEdit: (key: string) => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  const isEditing = editingSection === sectionKey;
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden break-inside-avoid mb-4">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-1">
            <Button size="sm" onClick={onSave} className="h-7 px-3 text-xs gap-1">
              <Check className="w-3 h-3" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="h-7 px-2 text-xs"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(sectionKey)}
            className="h-7 px-2 text-xs gap-1 text-gray-400 hover:text-gray-900"
          >
            <PencilSimple className="w-3.5 h-3.5" />
            Edit
          </Button>
        )}
      </div>
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}

// ── Skeleton section ────────────────────────────────────────────────────────
function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden break-inside-avoid mb-4">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/60">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="px-4 py-2 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-1">
            <Skeleton className="h-3 w-24 flex-shrink-0" />
            <Skeleton className="h-3 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function PersonProfileTab({ personId }: PersonProfileTabProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const { data: response, isLoading } = usePerson(personId);
  const person = response?.data;

  // Family — fetched from DB when person has a familyId
  const { data: familyResponse, isLoading: loadingFamily } = useFamily(
    person?.familyId ?? ""
  );
  const family = familyResponse?.data;

  // Local form state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

  const handleSave = () => setEditingSection(null);
  const handleCancel = () => setEditingSection(null);

  // ── Loading state ──
  if (isLoading) {
    return (
      <div className="py-4" style={{ columns: "2", columnGap: "1rem" }}>
        <SectionSkeleton rows={4} />
        <SectionSkeleton rows={7} />
        <SectionSkeleton rows={6} />
        <SectionSkeleton rows={4} />
        <SectionSkeleton rows={3} />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">Person not found</p>
      </div>
    );
  }

  const name = person.user?.name || "Unknown";
  const isEditingPersonal = editingSection === "personal";
  const isEditingContact = editingSection === "contact";
  const isEditingAdditional = editingSection === "additional";
  const isEditingHealth = editingSection === "health";

  return (
    <div className="py-4">
      {/*
        Two explicit flex columns so Family is guaranteed in the shorter column.
        Column 1: Personal + Additional + Family
        Column 2: Contact + Health
      */}
      <div className="flex gap-4 items-start">

        {/* ── Column 1 ── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Personal details */}
          <Section
            icon={UserCircle}
            title="Personal details"
            sectionKey="personal"
            editingSection={editingSection}
            onEdit={setEditingSection}
            onSave={handleSave}
            onCancel={handleCancel}
          >
            <FieldRow icon={UserCircle} label="Full name" value={name} editing={isEditingPersonal}>
              <Input defaultValue={name} className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={GenderIntersex} label="Gender" value={person.gender} editing={isEditingPersonal}>
              <Select defaultValue={person.gender}>
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow icon={Cake} label="Birthday" value={null} editing={isEditingPersonal}>
              <Input type="date" className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={UsersThree} label="Age group" value={person.ageGroup} editing={isEditingPersonal}>
              <Select defaultValue={person.ageGroup ?? undefined}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Child">Child</SelectItem>
                  <SelectItem value="Youth">Youth</SelectItem>
                  <SelectItem value="Adult">Adult</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
          </Section>

          {/* Additional details */}
          <Section
            icon={IdentificationCard}
            title="Additional details"
            sectionKey="additional"
            editingSection={editingSection}
            onEdit={setEditingSection}
            onSave={handleSave}
            onCancel={handleCancel}
          >
            <FieldRow icon={Briefcase} label="Occupation" value={null} editing={isEditingAdditional}>
              <Input className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={GraduationCap} label="Education" value={null} editing={isEditingAdditional}>
              <Input className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={Translate} label="Language" value={null} editing={isEditingAdditional}>
              <Input className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={Heart} label="Marital status" value={null} editing={isEditingAdditional}>
              <Select>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow icon={CalendarDots} label="Baptized" value={null} editing={isEditingAdditional}>
              <Input type="date" className="h-8 text-sm" />
            </FieldRow>
            <FieldRow
              icon={CalendarDots}
              label="Joined"
              value={new Date(person.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            />
          </Section>

          {/* Family — always in the shorter column 1 */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/60">
              <House className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Family</h3>
            </div>
            <div className="px-4 py-3">
              {!person.familyId && (
                <p className="text-sm text-gray-400">Not connected to a family</p>
              )}
              {person.familyId && loadingFamily && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              )}
              {person.familyId && !loadingFamily && family && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{family.name}</p>
                      {family.headOfHouse && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Crown className="w-3 h-3 text-amber-500" />
                          <span className="text-xs text-gray-500">Head: {family.headOfHouse.name}</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      {family.memberCount ?? family.members?.length ?? 0} members
                    </Badge>
                  </div>
                  {family.members && family.members.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-gray-50">
                      {family.members.map((m) => {
                        const isHead = family.headOfHouseId === m.id;
                        const initials = m.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
                        return (
                          <div key={m.id} className="flex items-center gap-2.5 py-1">
                            <Avatar className="w-6 h-6 flex-shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-900 flex-1 min-w-0 truncate">{m.name}</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {isHead && <Crown className="w-3 h-3 text-amber-400" />}
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-gray-50 text-gray-500 border-gray-200">
                                {m.familyRole}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              {person.familyId && !loadingFamily && !family && (
                <p className="text-sm text-gray-400">Family not found</p>
              )}
            </div>
          </div>

        </div>

        {/* ── Column 2 ── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Contact details */}
          <Section
            icon={EnvelopeSimple}
            title="Contact details"
            sectionKey="contact"
            editingSection={editingSection}
            onEdit={setEditingSection}
            onSave={handleSave}
            onCancel={handleCancel}
          >
            <FieldRow icon={EnvelopeSimple} label="Email" value={person.user?.email} editing={isEditingContact}>
              <Input type="email" defaultValue={person.user?.email} className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={Phone} label="Phone" value={phoneNumber || null} editing={isEditingContact}>
              <PhoneInput
                value={phoneNumber}
                onChange={(v) => setPhoneNumber((v as string) || "")}
                defaultCountry="CM"
              />
            </FieldRow>
            <FieldRow icon={MapPin} label="Address" value={null} editing={isEditingContact}>
              <Input className="h-8 text-sm" placeholder="Street address" />
            </FieldRow>
            <FieldRow icon={Globe} label="Country" value={selectedCountry?.name} editing={isEditingContact}>
              <CountrySelector
                value={selectedCountry?.name}
                onChange={(c) => { setSelectedCountry(c); setSelectedState(null); setSelectedCity(null); }}
              />
            </FieldRow>
            <FieldRow icon={MapTrifold} label="State" value={selectedState?.name} editing={isEditingContact}>
              <StateSelector
                countryCode={selectedCountry?.isoCode}
                value={selectedState?.name}
                onChange={(s) => { setSelectedState(s); setSelectedCity(null); }}
              />
            </FieldRow>
            <FieldRow icon={Buildings} label="City" value={selectedCity?.name} editing={isEditingContact}>
              <CitySelector
                countryCode={selectedCountry?.isoCode}
                stateCode={selectedState?.isoCode}
                value={selectedCity?.name}
                onChange={setSelectedCity}
              />
            </FieldRow>
            <FieldRow icon={Hash} label="Zip code" value={null} editing={isEditingContact}>
              <Input className="h-8 text-sm" placeholder="Zip / postal code" />
            </FieldRow>
          </Section>

          {/* Health details */}
          <Section
            icon={FirstAid}
            title="Health details"
            sectionKey="health"
            editingSection={editingSection}
            onEdit={setEditingSection}
            onSave={handleSave}
            onCancel={handleCancel}
          >
            <FieldRow icon={Warning} label="Allergies" value={null} editing={isEditingHealth}>
              <Input className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={ForkKnife} label="Diet" value={null} editing={isEditingHealth}>
              <Input className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={Notepad} label="Medical notes" value={null} editing={isEditingHealth}>
              <Input className="h-8 text-sm" />
            </FieldRow>
            <FieldRow icon={Drop} label="Blood type" value={null} editing={isEditingHealth}>
              <Select>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
          </Section>

        </div>
      </div>
    </div>
  );

}
