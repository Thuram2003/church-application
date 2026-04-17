"use client";

import { useState } from "react";
import {
  Calendar,
  CurrencyDollar,
  Users,
  DoorOpen,
  Envelope,
  SquaresFour,
  FileText,
  UserCheck,
  Calculator,
  Check,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const goals: Goal[] = [
  {
    id: "events",
    title: "Events & Attendance",
    description: "Plan events, track attendance, and stay organized.",
    icon: Calendar,
  },
  {
    id: "giving",
    title: "Giving & Contributions",
    description: "Track donations, issue receipts, analyze giving trends.",
    icon: CurrencyDollar,
  },
  {
    id: "volunteer",
    title: "Volunteer & Scheduling",
    description: "Organize volunteer teams and schedule seamlessly.",
    icon: Users,
  },
  {
    id: "rooms",
    title: "Room & Resource Management",
    description: "Schedule rooms and resources for meetings and events.",
    icon: DoorOpen,
  },
  {
    id: "communication",
    title: "Communication Center",
    description: "Send emails, SMS, announcements to members easily.",
    icon: Envelope,
  },
  {
    id: "portal",
    title: "Church Portal",
    description: "Give members access to events, donations, and more.",
    icon: SquaresFour,
  },
  {
    id: "forms",
    title: "Forms & Surveys",
    description: "Create custom forms for registrations and requests.",
    icon: FileText,
  },
  {
    id: "checkin",
    title: "Child Check-In",
    description: "Ensure a safe and efficient process for children.",
    icon: UserCheck,
  },
  {
    id: "accounting",
    title: "Accounting",
    description: "Manage accounting, expenses, and financial reports.",
    icon: Calculator,
  },
];

interface GoalsStepProps {
  onComplete: (goals: string[]) => void;
  onBack: () => void;
  initialGoals?: string[];
  isSubmitting?: boolean;
}

export function GoalsStep({ onComplete, onBack, initialGoals = [], isSubmitting = false }: GoalsStepProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialGoals);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, goalId];
    });
  };

  const handleContinue = () => {
    if (selectedGoals.length === 3) {
      onComplete(selectedGoals);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          What are your 3 main goals with Movementz?
        </h1>
        <p className="text-gray-500">
          Select the features that matter most to your church
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          const isDisabled = !isSelected && selectedGoals.length >= 3;
          const Icon = goal.icon;

          return (
            <button
              key={goal.id}
              onClick={() => !isDisabled && toggleGoal(goal.id)}
              disabled={isDisabled}
              className={`relative bg-white rounded-lg overflow-hidden transition-all duration-200 border-2 text-left ${
                isSelected
                  ? "border-[#5E5ADB] shadow-md"
                  : isDisabled
                  ? "border-gray-200 opacity-50 cursor-not-allowed"
                  : "border-gray-200 hover:border-gray-300 hover:shadow cursor-pointer"
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-3 right-3 z-10">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#5E5ADB] border-[#5E5ADB]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" weight="bold" />}
                </div>
              </div>

              {/* Card Illustration Area */}
              <div
                className="h-24 flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #FAFAFF 0%, #F0F0FF 100%)",
                }}
              >
                {/* Icon */}
                <div className="relative w-12 h-12 bg-white rounded-lg shadow flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#5E5ADB]" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {goal.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={selectedGoals.length !== 3 || isSubmitting}
          size="lg"
          className="px-8"
        >
          {isSubmitting ? "Creating Church..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );
}
