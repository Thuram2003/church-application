"use client";

import type { GroupedChurch } from "@/types/auth";

interface WorkspaceListProps {
  groupedChurches: GroupedChurch[];
  onSelectWorkspace: (branchId: string) => void;
  isLoading?: boolean;
  selectedBranchId: string | null;
  currentBranchId?: string | null;
}

export function WorkspaceList({
  groupedChurches,
  onSelectWorkspace,
  isLoading = false,
  selectedBranchId,
  currentBranchId,
}: WorkspaceListProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Select Workspace
          </h1>
          <p className="text-gray-500">
            Choose a church to continue
          </p>
        </div>

        <div className="space-y-6">
          {groupedChurches.map((item) => (
            <div key={item.church.id} className="space-y-3">
              {/* Church Header */}
              <div className="flex items-center gap-3 px-1">
                {item.church.logo ? (
                  <img
                    src={item.church.logo}
                    alt={item.church.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {item.church.name}
                  </h2>
                  {item.church.denomination && (
                    <p className="text-xs text-gray-500">
                      {item.church.denomination}
                    </p>
                  )}
                </div>
              </div>

              {/* Branches */}
              <div className="space-y-2">
                {item.branches.map((branch) => {
                  const isCurrentWorkspace = currentBranchId === branch.id;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => onSelectWorkspace(branch.id)}
                      disabled={isLoading}
                      className={`w-full flex items-center justify-between p-4 border rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        isCurrentWorkspace
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:bg-gray-50 hover:border-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCurrentWorkspace ? "bg-primary/20" : "bg-gray-100"
                        }`}>
                          <svg
                            className={`w-5 h-5 ${isCurrentWorkspace ? "text-primary" : "text-gray-600"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{branch.name}</p>
                          <p className="text-sm text-gray-500">
                            {branch.city || 'Location not set'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCurrentWorkspace && (
                          <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                            Current
                          </span>
                        )}
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full capitalize">
                          {branch.memberRole}
                        </span>
                        {selectedBranchId === branch.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
