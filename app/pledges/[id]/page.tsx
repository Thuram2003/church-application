"use client";

import {
  Target,
  Plus,
  Clock,
  ArrowLeft,
  PencilSimple,
  Trash,
  DotsThree,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PledgeStatCard } from "@/components/pledge-stat-card";
import { AddPledgeDialog } from "@/components/finances/AddPledgeDialog";

// Mock data - in real app, fetch by ID
const getPledge = (id: string) => ({
  id: parseInt(id),
  campaignName: "New Items for Students",
  fund: "General fund",
  status: "Active",
  startDate: "Mar 30, 2026",
  endDate: "Mar 30, 2027",
  totalPledged: 0.00,
  totalRaised: 0.00,
  remaining: 0.00,
  progress: 0,
});

export default function PledgeDetailPage() {
  const params = useParams();
  const pledge = getPledge(params.id as string);
  const [addPledgeOpen, setAddPledgeOpen] = useState(false);

  const handleAddPledge = (data: any) => {
    console.log("Adding pledge:", data);
    // API call here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/pledges">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Link href="/pledges" className="text-sm text-primary hover:underline">
              Pledges
            </Link>
            <span className="text-sm text-gray-400">—</span>
            <span className="text-sm font-semibold text-gray-900">{pledge.campaignName}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <DotsThree className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Campaign Info */}
        <div className="space-y-6">
          {/* Icon */}
          <div className="w-40 h-40 bg-primary-light rounded-sm flex items-center justify-center">
            <Target className="w-20 h-20 text-primary" />
          </div>

          {/* Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {pledge.campaignName}
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  {pledge.status}
                </Badge>
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                  {pledge.fund}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {pledge.startDate} - {pledge.endDate}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-gray-700"
              onClick={() => setAddPledgeOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add pledge
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-gray-700">
              <PencilSimple className="w-4 h-4" />
              Edit pledge
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash className="w-4 h-4" />
              Delete pledge account
            </Button>
          </div>
        </div>

        {/* Right - Stats & Empty State */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <PledgeStatCard
              icon={Target}
              label="Total pledged"
              value={`XAF ${pledge.totalPledged.toFixed(2)}`}
            />
            <PledgeStatCard
              icon={Clock}
              label="Remaining"
              value={`XAF ${pledge.remaining.toFixed(2)}`}
            />
            <PledgeStatCard
              icon={Plus}
              label="Total raised"
              value={`XAF ${pledge.totalRaised.toFixed(2)}`}
              variant="highlight"
            />
          </div>

          {/* Empty State */}
          <div className="bg-white border border-gray-100 rounded-sm p-12 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              No Pledges Recorded Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Once you've set up a pledge account, you can create individual pledges for members — tracking their commitments and helping them stay on course.
            </p>
            <Button onClick={() => setAddPledgeOpen(true)}>
              Add a pledge for a member
            </Button>
          </div>
        </div>
      </div>

      {/* Add Pledge Dialog */}
      <AddPledgeDialog
        open={addPledgeOpen}
        onOpenChange={setAddPledgeOpen}
        onSubmit={handleAddPledge}
        campaignName={pledge.campaignName}
        daysLeft={364}
      />
    </div>
  );
}
