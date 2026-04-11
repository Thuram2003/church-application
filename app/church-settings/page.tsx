"use client";

import { Gear, Church, ListPlus, Phone } from "@phosphor-icons/react";
import { useState } from "react";
import { TabNavigation, TabItem } from "@/components/TabNavigation";
import {
  ChurchDetailsTab,
  ContactDetailsTab,
  ExtraFieldsTab,
  DefaultsTab,
} from "@/components/church-settings";

export default function ChurchSettingsPage() {
  const [activeTab, setActiveTab] = useState("church-details");

  const tabs: TabItem[] = [
    {
      value: "church-details",
      label: "Church details",
      icon: <Church className="w-4 h-4" />,
      content: <ChurchDetailsTab />,
    },
    {
      value: "contact-details",
      label: "Contact details",
      icon: <Phone className="w-4 h-4" />,
      content: <ContactDetailsTab />,
    },
    {
      value: "extra-fields",
      label: "Extra Fields",
      icon: <ListPlus className="w-4 h-4" />,
      content: <ExtraFieldsTab />,
    },
    {
      value: "defaults",
      label: "Defaults",
      icon: <Gear className="w-4 h-4" />,
      content: <DefaultsTab />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-2 text-primary">
        <Gear className="w-5 h-5" />
        <h1 className="text-lg font-semibold">Church Settings</h1>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
