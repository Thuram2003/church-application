"use client";

import {
  UserGear,
  Users,
  UserCircle,
  ShieldCheck,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InviteUserDialog } from "@/components/users/InviteUserDialog";
import { CreateRoleDialog } from "@/components/users/CreateRoleDialog";
import { UsersTab, RolesTab } from "@/components/users";
import { TabNavigation, TabItem } from "@/components/TabNavigation";

// Mock data
const users = [
  {
    id: 1,
    email: "6785@gmail.com",
    role: "Pastor",
    status: "Pending",
  },
];

const roles = [
  {
    id: "1",
    name: "Administrator",
    description:
      "Full access to all system features and settings. Can view, edit, and manage all data, including giving details and user accounts.",
    permissions: [
      { name: "Members Management", enabled: true },
      { name: "Groups Management", enabled: true },
      { name: "Events Management", enabled: true },
      { name: "Families Management", enabled: true },
      { name: "Messages", enabled: true },
      { name: "Updates", enabled: true },
      { name: "Forms", enabled: true },
      { name: "Funds", enabled: true },
      { name: "Giving", enabled: true },
      { name: "Accounting", enabled: true },
      { name: "Appointments", enabled: true },
      { name: "Pledge Accounts", enabled: true },
      { name: "Settings", enabled: true },
      { name: "Subscription", enabled: true },
      { name: "User Roles", enabled: true },
      { name: "Integrations", enabled: true },
      { name: "Follow Ups", enabled: true },
      { name: "Portal", enabled: true },
      { name: "Batches", enabled: true },
    ],
    permissionCount: 19,
    type: "System Role" as const,
    color: "var(--primary)",
  },
  {
    id: "2",
    name: "Pastor",
    description:
      "Full access to most system features. Can manage user accounts, events, and other church activities.",
    permissions: [
      { name: "Members Management", enabled: true },
      { name: "Groups Management", enabled: true },
      { name: "Events Management", enabled: true },
      { name: "Families Management", enabled: true },
      { name: "Messages", enabled: true },
      { name: "Updates", enabled: true },
      { name: "Forms", enabled: true },
      { name: "Funds", enabled: true },
      { name: "Giving", enabled: false },
      { name: "Accounting", enabled: false },
      { name: "Appointments", enabled: true },
      { name: "Pledge Accounts", enabled: true },
      { name: "Settings", enabled: false },
      { name: "Subscription", enabled: false },
      { name: "User Roles", enabled: false },
      { name: "Integrations", enabled: false },
      { name: "Follow Ups", enabled: true },
      { name: "Portal", enabled: true },
      { name: "Batches", enabled: false },
    ],
    permissionCount: 14,
    type: "System Role" as const,
    color: "var(--primary)",
  },
  {
    id: "3",
    name: "IT",
    description:
      "Full access to most system features. Cannot view giving details. Can manage user accounts, events, and other church activities.",
    permissions: [
      { name: "Members Management", enabled: true },
      { name: "Groups Management", enabled: true },
      { name: "Events Management", enabled: true },
      { name: "Families Management", enabled: true },
      { name: "Messages", enabled: true },
      { name: "Updates", enabled: true },
      { name: "Forms", enabled: true },
      { name: "Funds", enabled: true },
      { name: "Giving", enabled: false },
      { name: "Accounting", enabled: false },
      { name: "Appointments", enabled: true },
      { name: "Pledge Accounts", enabled: true },
      { name: "Settings", enabled: true },
      { name: "Subscription", enabled: true },
      { name: "User Roles", enabled: true },
      { name: "Integrations", enabled: true },
      { name: "Follow Ups", enabled: true },
      { name: "Portal", enabled: true },
      { name: "Batches", enabled: false },
    ],
    permissionCount: 14,
    type: "System Role" as const,
    color: "var(--primary)",
  },
  {
    id: "4",
    name: "Standard",
    description:
      "Access to basic features of the system. Cannot view or manage giving details or access the settings page.",
    permissions: [
      { name: "Members Management", enabled: true },
      { name: "Groups Management", enabled: true },
      { name: "Events Management", enabled: true },
      { name: "Families Management", enabled: true },
      { name: "Messages", enabled: true },
      { name: "Updates", enabled: true },
      { name: "Forms", enabled: true },
      { name: "Funds", enabled: false },
      { name: "Giving", enabled: false },
      { name: "Accounting", enabled: false },
      { name: "Appointments", enabled: false },
      { name: "Pledge Accounts", enabled: false },
      { name: "Settings", enabled: false },
      { name: "Subscription", enabled: false },
      { name: "User Roles", enabled: false },
      { name: "Integrations", enabled: false },
      { name: "Follow Ups", enabled: false },
      { name: "Portal", enabled: false },
      { name: "Batches", enabled: false },
    ],
    permissionCount: 10,
    type: "System Role" as const,
    color: "var(--primary)",
  },
  {
    id: "5",
    name: "Event Coordinator",
    description:
      "Access limited to event management features. Can create, edit, and manage church events.",
    permissions: [
      { name: "Members Management", enabled: false },
      { name: "Groups Management", enabled: false },
      { name: "Events Management", enabled: true },
      { name: "Families Management", enabled: false },
      { name: "Messages", enabled: false },
      { name: "Updates", enabled: false },
      { name: "Forms", enabled: false },
      { name: "Funds", enabled: false },
      { name: "Giving", enabled: false },
      { name: "Accounting", enabled: false },
      { name: "Appointments", enabled: false },
      { name: "Pledge Accounts", enabled: false },
      { name: "Settings", enabled: false },
      { name: "Subscription", enabled: false },
      { name: "User Roles", enabled: false },
      { name: "Integrations", enabled: false },
      { name: "Follow Ups", enabled: false },
      { name: "Portal", enabled: false },
      { name: "Batches", enabled: false },
    ],
    permissionCount: 2,
    type: "System Role" as const,
    color: "var(--warning)",
  },
  {
    id: "6",
    name: "Group Leader",
    description:
      "Users can create, edit, and manage church events and groups with limited access to only these features.",
    permissions: [
      { name: "Members Management", enabled: false },
      { name: "Groups Management", enabled: true },
      { name: "Events Management", enabled: true },
      { name: "Families Management", enabled: false },
      { name: "Messages", enabled: false },
      { name: "Updates", enabled: false },
      { name: "Forms", enabled: false },
      { name: "Funds", enabled: false },
      { name: "Giving", enabled: false },
      { name: "Accounting", enabled: false },
      { name: "Appointments", enabled: false },
      { name: "Pledge Accounts", enabled: false },
      { name: "Settings", enabled: false },
      { name: "Subscription", enabled: false },
      { name: "User Roles", enabled: false },
      { name: "Integrations", enabled: false },
      { name: "Follow Ups", enabled: false },
      { name: "Portal", enabled: false },
      { name: "Batches", enabled: false },
    ],
    permissionCount: 2,
    type: "System Role" as const,
    color: "var(--warning)",
  },
];

type TabType = "users" | "roles";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false);

  const handleInviteUser = (userData: any) => {
    console.log("Inviting user:", userData);
    // API call here
  };

  const handleEditUser = (user: any) => {
    console.log("Editing user:", user);
    // API call here
  };

  const handleResendInvitation = (user: any) => {
    console.log("Resending invitation:", user);
    // API call here
  };

  const handleRemoveUser = (user: any) => {
    console.log("Removing user:", user);
    // API call here
  };

  const handleCreateRole = () => {
    setCreateRoleDialogOpen(true);
  };

  const handleEditRole = (role: any) => {
    console.log("Editing role:", role);
    // Open edit role dialog with role data
  };

  const handleSubmitRole = (roleData: any) => {
    console.log("Creating/updating role:", roleData);
    // API call here
  };

  // Calculate stats
  const totalUsers = users.length;
  const admins = users.filter((u) => u.role === "Admin").length;
  const pastors = users.filter((u) => u.role === "Pastor").length;
  const customRoles = roles.filter((r) => r.type === "Custom Role").length;

  const tabs: TabItem[] = [
    {
      value: "users",
      label: "Users",
      icon: <Users className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative max-w-xs">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <UsersTab
            users={users}
            onEditUser={handleEditUser}
            onResendInvitation={handleResendInvitation}
            onRemoveUser={handleRemoveUser}
          />
        </div>
      ),
    },
    {
      value: "roles",
      label: "Roles",
      icon: <ShieldCheck className="w-4 h-4" />,
      content: (
        <RolesTab
          roles={roles}
          onCreateRole={handleCreateRole}
          onEditRole={handleEditRole}
        />
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <UserGear className="w-5 h-5" />
          <h1 className="text-lg font-semibold">User & Roles</h1>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)} size="sm">
          Invite user
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total users" value={totalUsers.toString()} />
        <StatCard icon={UserCircle} label="Admins" value={admins.toString()} />
        <StatCard icon={UserCircle} label="Pastor" value={pastors.toString()} />
        <StatCard
          icon={ShieldCheck}
          label="Custom roles"
          value={customRoles.toString()}
        />
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Invite User Dialog */}
      <InviteUserDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        onSubmit={handleInviteUser}
      />

      {/* Create Role Dialog */}
      <CreateRoleDialog
        open={createRoleDialogOpen}
        onOpenChange={setCreateRoleDialogOpen}
        onSubmit={handleSubmitRole}
      />
    </div>
  );
}
