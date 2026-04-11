"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  HandCoins,
  UsersThree,
  Door,
  Broadcast,           // ← Hotspot/communication tower
  Church,              // ← Church building for portal
  ListChecks,
  Baby,
  Calculator,
  Check,
} from "@phosphor-icons/react";

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
    icon: CalendarCheck,
  },
  {
    id: "giving",
    title: "Giving & Contributions",
    description: "Track donations, issue receipts, analyze giving trends.",
    icon: HandCoins,
  },
  {
    id: "volunteer",
    title: "Volunteer & Scheduling",
    description: "Organize volunteer teams and schedule seamlessly.",
    icon: UsersThree,
  },
  {
    id: "rooms",
    title: "Room & Resource Management",
    description: "Schedule rooms and resources for meetings and events.",
    icon: Door,           // ← Door as requested
  },
  {
    id: "communication",
    title: "Communication Center",
    description: "Send emails, SMS, announcements to members easily.",
    icon: Broadcast,      // ← Hotspot/broadcast tower
  },
  {
    id: "portal",
    title: "Church Portal",
    description: "Give members access to events, donations, and more.",
    icon: Church,          // ← Church building
  },
  {
    id: "forms",
    title: "Forms & Surveys",
    description: "Create custom forms for registrations and requests.",
    icon: ListChecks,
  },
  {
    id: "checkin",
    title: "Child Check-In",
    description: "Ensure a safe and efficient process for children.",
    icon: Baby,
  },
  {
    id: "accounting",
    title: "Accounting",
    description: "Manage accounting, expenses, and financial reports.",
    icon: Calculator,      // ← Calculator as requested
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

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
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            What are your 3 main goals with Gracely?
          </h1>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            const isDisabled = !isSelected && selectedGoals.length >= 3;
            const Icon = goal.icon;

            return (
              <button
                key={goal.id}
                onClick={() => !isDisabled && toggleGoal(goal.id)}
                disabled={isDisabled}
                className={`relative bg-white rounded-sm overflow-hidden transition-all duration-200 border-2 text-left ${
                  isSelected
                    ? "border-primary shadow-md"
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
                        ? "bg-primary border-primary"
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
                      "linear-gradient(135deg, var(--primary-lighter) 0%, var(--primary-light) 100%)",
                  }}
                >
                  {/* Icon */}
                  <div className="relative w-12 h-12 bg-white rounded-sm shadow flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
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

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={selectedGoals.length !== 3}
            className={`px-8 py-3 rounded-sm font-medium text-sm transition-all duration-300 ${
              selectedGoals.length === 3
                ? "bg-primary text-white hover:bg-primary-dark shadow hover:shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            I am ready to go
          </button>
        </div>
      </div>
    </div>
  );
}