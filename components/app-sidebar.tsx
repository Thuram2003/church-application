"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House, Users, Wallet, Money, Bank, Coins,
  Stack, Calculator, Gear, Calendar, DoorOpen,
  Package, Clock, Bell, Envelope, ChatCircle, Megaphone,
  ChatCircleDots, ClipboardText, ChartBar, GearSix, UserGear,
  Question, ArrowSquareOut, UsersThree, HouseLine,
  Target, ChartPie, HandCoins,  Broadcast, Faders, SunHorizonIcon,
  CheckSquare,
} from "@phosphor-icons/react";

import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppSidebarUserMenu } from "@/components/app-sidebar-user-menu";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { id: "home", label: "Home", icon: House, href: "/home" },
  {
    id: "people", label: "People", icon: Users,
    children: [
      { id: "people-list", label: "People", icon: Users, href: "/people" },
      { id: "families", label: "Families", icon: HouseLine, href: "/families" },
      { id: "groups", label: "Groups", icon: UsersThree, href: "/groups" },
      { id: "attendance", label: "Attendance", icon: CheckSquare, href: "/attendance" },
    ],
  },
  {
    id: "finances", label: "Finances", icon: Bank,
    children: [
      { id: "giving", label: "Giving", icon: HandCoins, href: "/giving" },
      { id: "funds", label: "Funds", icon: Coins, href: "/funds" },
      { id: "pledges", label: "Pledges", icon: Target, href: "/pledges" },
      { id: "batches", label: "Batches", icon: Stack, href: "/batches" },
      { id: "accounting", label: "Accounting", icon: Calculator, href: "/accounting" },
      { id: "financial-settings", label: "Financial Settings", icon: Faders, href: "/financial-settings" },
    ],
  },
  {
    id: "calendar", label: "Calendar", icon: Calendar,
    children: [
      { id: "calendar-view", label: "Calendar", icon: Calendar, href: "/calendar" },
      { id: "rooms", label: "Rooms", icon: DoorOpen, href: "/rooms" },
      { id: "resources", label: "Resources", icon: Package, href: "/resources" },
      { id: "appointments", label: "Appointments", icon: Clock, href: "/appointments" },
      { id: "follow-ups", label: "Follow Ups", icon: Bell, href: "/follow-ups" },
    ],
  },
  {
    id: "communications", label: "Communications", icon:  Broadcast,
    children: [
      { id: "emails", label: "Emails", icon: Envelope, href: "/emails" },
      { id: "sms", label: "SMS", icon: ChatCircle, href: "/sms" },
      { id: "announcements", label: "Announcements", icon: Megaphone, href: "/announcements" },
      { id: "chat", label: "Chat", icon: ChatCircleDots, href: "/chat" },
    ],
  },
  { id: "forms", label: "Forms", icon: ClipboardText, href: "/forms" },
  { id: "devotion", label: "Devotion", icon: SunHorizonIcon, href: "/devotion" },
  {
    id: "reports", label: "Reports and Metrics", icon: ChartBar,
    children: [
      { id: "reports-people", label: "People", icon: Users, href: "/reports/people" },
      { id: "reports-finances", label: "Finances", icon: Bank, href: "/reports/finance" },
    ],
  },
];

const bottomNav = [
  { id: "church-settings", label: "Church Settings", icon: GearSix, href: "/church-settings" },
  { id: "user-roles", label: "User and Roles", icon: UserGear, href: "/users" },
  { id: "help", label: "Open Help Center", icon: Question, href: "/help" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/home") {
      return pathname === href;
    }
    if (href === "/forms") {
      return pathname === href || pathname.startsWith("/forms/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <Sidebar collapsible="icon" {...props} className="border-sidebar-border bg-white">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between px-3 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Movementz
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="group-data-[collapsible=icon]:hidden text-primary hover:text-primary-dark hover:bg-primary-lighter"
              asChild
            >
              <a href="/portal" target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Navigation */}
          <SidebarMenu className="px-2 py-2">
            <Accordion type="multiple" className="w-full space-y-1">
              {navigationItems.map((item) => {
                const hasChildren = !!item.children?.length;
                const itemActive = isActive(item.href);

                if (!hasChildren) {
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={itemActive}
                        className={cn(
                          "sidebar-menu-item",
                          itemActive && "sidebar-menu-item-active"
                        )}
                      >
                        <Link href={item.href || "#"}>
                          <item.icon className="w-[18px] h-[18px]" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-0"
                  >
                    <AccordionTrigger className="sidebar-accordion-trigger py-2 px-2 rounded-md hover:no-underline [&[data-state=open]>svg]:rotate-180">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-[18px] h-[18px]" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pt-1">
                      <SidebarMenuSub className="border-l-0">
                        {item.children?.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={childActive}
                                className={cn(
                                  "sidebar-menu-item",
                                  childActive && "sidebar-menu-item-active"
                                )}
                              >
                                <Link href={child.href || "#"}>
                                  <child.icon className="w-[18px] h-[18px]" />
                                  <span>{child.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border bg-sidebar">
        {/* Bottom Navigation */}
        <SidebarMenu>
          {bottomNav.map((item) => {
            const itemActive = isActive(item.href);
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton 
                  asChild 
                  isActive={itemActive}
                  className={cn(
                    "sidebar-menu-item",
                    itemActive && "sidebar-menu-item-active"
                  )}
                >
                  <Link href={item.href || "#"}>
                    <item.icon className="w-[18px] h-[18px]" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* User Profile Menu */}
        <AppSidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}