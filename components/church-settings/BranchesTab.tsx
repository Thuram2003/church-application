"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Phone, Envelope } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with actual API call
const mockBranches = [
  {
    id: "1",
    name: "Main Branch",
    address: "123 Church Street",
    city: "New York",
    state: "NY",
    country: "United States",
    zipCode: "10001",
    phoneNumber: "+1 (555) 123-4567",
    isHeadquarters: true,
  },
];

export function BranchesTab() {
  const [branches] = useState(mockBranches);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Branches</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your church locations and branches
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Branch
        </Button>
      </div>

      <div className="grid gap-4">
        {branches.map((branch) => (
          <Card key={branch.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{branch.name}</CardTitle>
                    {branch.isHeadquarters && (
                      <Badge variant="secondary" className="text-xs">
                        Headquarters
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1">
                    Branch location and contact information
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900">{branch.address}</p>
                  <p className="text-gray-500">
                    {branch.city}, {branch.state} {branch.zipCode}
                  </p>
                  <p className="text-gray-500">{branch.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-900">{branch.phoneNumber}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {branches.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No branches yet
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Add your first branch to start managing multiple locations
            </p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Branch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
