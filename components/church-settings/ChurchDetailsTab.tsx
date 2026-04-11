"use client";

import { Church, Envelope, PencilSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ChurchDetailsTabProps = {
  initialData?: {
    name: string;
    email: string;
    logo: File | null;
  };
};

export function ChurchDetailsTab({ initialData }: ChurchDetailsTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [churchDetails, setChurchDetails] = useState(
    initialData || {
      name: "Oneworld shilo Ministries",
      email: "alexmice856@gmail.com",
      logo: null as File | null,
    }
  );

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setChurchDetails({ ...churchDetails, logo: e.target.files[0] });
    }
  };

  const handleSave = () => {
    // API call to save church details
    console.log("Saving church details:", churchDetails);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Church className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-gray-900">Church details</h2>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <PencilSimple className="w-4 h-4" />
            Edit
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-2xl space-y-6">
        {/* Church Name */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <div className="flex items-center gap-2">
              <Church className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Church name</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={churchDetails.name}
                onChange={(e) =>
                  setChurchDetails({ ...churchDetails, name: e.target.value })
                }
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">{churchDetails.name}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <div className="flex items-center gap-2">
              <Envelope className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Email</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                type="email"
                value={churchDetails.email}
                onChange={(e) =>
                  setChurchDetails({ ...churchDetails, email: e.target.value })
                }
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">{churchDetails.email}</p>
            )}
          </div>
        </div>

        {/* Church Logo */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <span className="text-sm text-gray-600">Church Logo</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-sm flex items-center justify-center border border-gray-200 overflow-hidden">
                {churchDetails.logo ? (
                  <img
                    src={URL.createObjectURL(churchDetails.logo)}
                    alt="Church logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Church className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {isEditing && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Max 1 MB</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("logo-upload")?.click()}
                  >
                    Change church logo
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave}>Save changes</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
