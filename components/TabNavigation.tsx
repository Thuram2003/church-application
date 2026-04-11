"use client";

import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export type TabItem = {
  value: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

type TabNavigationProps = {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "line";
};

export function TabNavigation({
  tabs,
  defaultTab,
  activeTab,
  onTabChange,
  className,
  variant = "default",
}: TabNavigationProps) {
  return (
    <Tabs
      value={activeTab}
      defaultValue={defaultTab || tabs[0]?.value}
      onValueChange={onTabChange}
      className={className}
    >
      <TabsList variant={variant}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
