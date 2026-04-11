"use client";

import {
  Phone,
  MapPin,
  Buildings,
  MapTrifold,
  IdentificationCard,
  PencilSimple,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ContactDetailsTabProps = {
  initialData?: {
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export function ContactDetailsTab({ initialData }: ContactDetailsTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [contactDetails, setContactDetails] = useState(
    initialData || {
      phone: "+237 6 52 51 05 10",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    }
  );

  const handleSave = () => {
    // API call to save contact details
    console.log("Saving contact details:", contactDetails);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-gray-900">Contact details</h2>
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
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Phone</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={contactDetails.phone}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, phone: e.target.value })
                }
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">
                {contactDetails.phone || "-"}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Address</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={contactDetails.address}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, address: e.target.value })
                }
                placeholder="-"
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">
                {contactDetails.address || "-"}
              </p>
            )}
          </div>
        </div>

        {/* City */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <div className="flex items-center gap-2">
              <Buildings className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">City</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={contactDetails.city}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, city: e.target.value })
                }
                placeholder="-"
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">
                {contactDetails.city || "-"}
              </p>
            )}
          </div>
        </div>

        {/* State */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <div className="flex items-center gap-2">
              <MapTrifold className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">State</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={contactDetails.state}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, state: e.target.value })
                }
                placeholder="-"
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">
                {contactDetails.state || "-"}
              </p>
            )}
          </div>
        </div>

        {/* Zip Code */}
        <div className="flex items-start gap-4">
          <div className="w-32 pt-2">
            <div className="flex items-center gap-2">
              <IdentificationCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Zip code</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={contactDetails.zipCode}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, zipCode: e.target.value })
                }
                placeholder="-"
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">
                {contactDetails.zipCode || "-"}
              </p>
            )}
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
