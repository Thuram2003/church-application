"use client";

import { useState, Fragment } from "react";
import { CaretDown, CaretRight, Check, Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Permission {
  name: string;
  enabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  permissionCount: number;
  type: "System Role" | "Custom Role";
  color?: string;
}

interface RolesTabProps {
  roles: Role[];
  onCreateRole?: () => void;
  onEditRole?: (role: Role) => void;
}

export function RolesTab({ roles, onCreateRole, onEditRole }: RolesTabProps) {
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);

  const toggleRole = (roleId: string) => {
    setExpandedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  return (
    <div className="space-y-4">
      <Button onClick={onCreateRole} size="sm" className="gap-2">
        <Plus className="w-4 h-4" />
        Create Role
      </Button>

      <div className="border border-gray-100 rounded-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Permissions</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => {
              const isExpanded = expandedRoles.includes(role.id);
              return (
                <Fragment key={role.id}>
                  <TableRow className="cursor-pointer">
                    <TableCell onClick={() => toggleRole(role.id)}>
                      <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                        {isExpanded ? (
                          <CaretDown className="w-4 h-4 text-gray-600" />
                        ) : (
                          <CaretRight className="w-4 h-4 text-gray-600" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell onClick={() => toggleRole(role.id)}>
                      <div className="flex items-center gap-2">
                        {role.color && (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: role.color }}
                          />
                        )}
                        <span className="text-sm font-medium">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell onClick={() => toggleRole(role.id)}>
                      <span className="text-sm text-gray-600">
                        {role.description}
                      </span>
                    </TableCell>
                    <TableCell
                      className="text-center"
                      onClick={() => toggleRole(role.id)}
                    >
                      <span className="text-sm font-medium">
                        {role.permissionCount}
                      </span>
                    </TableCell>
                    <TableCell onClick={() => toggleRole(role.id)}>
                      <Badge
                        variant="secondary"
                        className="bg-primary-light text-primary border-primary-lighter"
                      >
                        {role.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditRole?.(role)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-gray-50">
                        <div className="p-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Permissions ({role.permissionCount})
                          </h4>
                          <div className="grid grid-cols-3 gap-4">
                            {role.permissions.map((permission, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                {permission.enabled && (
                                  <Check className="w-4 h-4 text-green-600" />
                                )}
                                <span
                                  className={`text-sm ${
                                    permission.enabled
                                      ? "text-gray-900"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {permission.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
