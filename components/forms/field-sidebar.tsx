"use client";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FieldSidebar() {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Enable Member Creation
          </h3>
          <Switch />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-700 block">
              Send submission notifications to:
            </label>
            <Select defaultValue="search">
              <SelectTrigger>
                <SelectValue placeholder="Search and select users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Search and select users</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="all">All users</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-blue-600">
              No users selected. Notifications will be sent to the church's
              default
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
