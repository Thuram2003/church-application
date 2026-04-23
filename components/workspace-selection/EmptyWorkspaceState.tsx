"use client";

import { Button } from "@/components/ui/button";

interface EmptyWorkspaceStateProps {
  onCreateChurch: () => void;
  isLoading?: boolean;
}

export function EmptyWorkspaceState({ 
  onCreateChurch, 
  isLoading = false 
}: EmptyWorkspaceStateProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
        <div className="text-center">
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
            Welcome to Movementz
          </h1>
          <p className="text-gray-500 mb-8">
            Get started by creating your church
          </p>
          <Button 
            onClick={onCreateChurch}
            disabled={isLoading}
            className="w-full h-11 font-medium"
          >
            Create New Church
          </Button>
        </div>
      </div>
    </div>
  );
}
