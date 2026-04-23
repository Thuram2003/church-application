"use client";

import { Church, PencilSimple, Tag, Link } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "@/components/ui/loader";
import { useChurch, useUpdateChurch } from "@/hooks/use-church";
import { FormSkeleton } from "@/components/ui/skeleton";

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

export function ChurchDetailsTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDenomination, setEditDenomination] = useState("");
  const [editLogo, setEditLogo] = useState("");

  const { data: church, isLoading } = useChurch();
  const updateMutation = useUpdateChurch();

  const handleEditStart = () => {
    setEditName(church?.name || "");
    setEditDenomination(church?.denomination || "");
    setEditLogo(church?.logo || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate(
      { name: editName, denomination: editDenomination, logo: editLogo || undefined },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 py-6">
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Church className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-gray-900">Church details</h2>
          </div>
        </div>
        <FormSkeleton fields={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Church className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-gray-900">Church details</h2>
        </div>
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={handleEditStart} className="gap-2">
            <PencilSimple className="w-4 h-4" />
            Edit
          </Button>
        )}
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Church Logo */}
        <div className="flex items-start gap-4">
          <div className="w-36 pt-2">
            <span className="text-sm text-gray-600">Church logo</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden flex-shrink-0">
              {(isEditing ? editLogo : church?.logo) ? (
                <img
                  src={isEditing ? editLogo : church!.logo!}
                  alt="Church logo"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <Church className="w-7 h-7 text-gray-300" />
              )}
            </div>
            {isEditing && (
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-1.5">Paste a public image URL</p>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input
                    value={editLogo}
                    onChange={(e) => setEditLogo(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="h-9 pl-8 text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Church Name */}
        <div className="flex items-start gap-4">
          <div className="w-36 pt-2">
            <div className="flex items-center gap-2">
              <Church className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Church name</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="h-10"
              />
            ) : (
              <p className="text-sm text-gray-900 py-2">{church?.name || "—"}</p>
            )}
          </div>
        </div>

        {/* Denomination */}
        <div className="flex items-start gap-4">
          <div className="w-36 pt-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Denomination</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Select value={editDenomination} onValueChange={setEditDenomination}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select denomination" />
                </SelectTrigger>
                <SelectContent>
                  {denominations.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-gray-900 py-2">
                {church?.denomination || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} disabled={updateMutation.isPending} size="sm">
              {updateMutation.isPending && <Loader className="w-3.5 h-3.5 mr-2" />}
              Save changes
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel} disabled={updateMutation.isPending}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
