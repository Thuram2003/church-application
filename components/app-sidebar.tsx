"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House, Users, Wallet, Money, Bank, Coins,
  Stack, Calculator, Gear, Calendar, DoorOpen,
  Package, Clock, Bell, Envelope, ChatCircle, Megaphone,
  ChatCircleDots, ClipboardText, ChartBar, GearSix, UserGear,
  Question, SidebarSimple, UsersThree, HouseLine,
  Target, ChartPie, HandCoins,  Broadcast, Faders, SunHorizonIcon,
  CheckSquare, CaretRight, CaretLeft, BookOpen,
} from "@phosphor-icons/react";

import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  useSidebar, SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  {
    id: "spiritual", label: "Spiritual", icon: SunHorizonIcon,
    children: [
      { id: "devotion", label: "Devotion", icon: SunHorizonIcon, href: "/devotion" },
      { id: "bible", label: "Bible", icon: BookOpen, href: "/bible" },
    ],
  },
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
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";

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

  const hasActiveChild = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some(child => isActive(child.href));
  };

  return (
    <Sidebar collapsible="icon" {...props} className="border-sidebar-border bg-white">
      <TooltipProvider delayDuration={0}>
        <SidebarContent className="bg-sidebar">
          <SidebarGroup className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between px-3 pt-3 pb-2 transition-all duration-300 ease-in-out">
            {!isCollapsed ? (
              <>
                <div className="flex items-center gap-2 animate-in fade-in duration-300">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-sidebar-foreground animate-in fade-in slide-in-from-left-2 duration-300">
                    Movementz
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-primary hover:text-primary-dark hover:bg-primary-lighter transition-all duration-200 animate-in fade-in duration-300"
                  onClick={toggleSidebar}
                  aria-label="Collapse sidebar"
                >
                  <SidebarSimple weight="bold" className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="w-full text-primary hover:text-primary-dark hover:bg-primary-lighter transition-all duration-200 animate-in fade-in zoom-in-50 duration-300"
                    onClick={toggleSidebar}
                    aria-label="Expand sidebar"
                  >
                    <SidebarSimple weight="fill" className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Expand sidebar</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Navigation */}
          <SidebarMenu className="px-2 py-2 transition-all duration-300">
            {!isCollapsed ? (
              <Accordion type="multiple" className="w-full space-y-1 animate-in fade-in duration-300">
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
            ) : (
              <div className="space-y-1 animate-in fade-in zoom-in-95 duration-300">
                {navigationItems.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const itemActive = isActive(item.href);

                  if (!hasChildren) {
                    return (
                      <SidebarMenuItem key={item.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton 
                              asChild 
                              isActive={itemActive}
                              className={cn(
                                "sidebar-menu-item justify-center",
                                itemActive && "sidebar-menu-item-active"
                              )}
                            >
                              <Link href={item.href || "#"}>
                                <item.icon className="w-[18px] h-[18px]" />
                              </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuItem>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.id}>
                      <DropdownMenu>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <SidebarMenuButton 
                                className="sidebar-menu-item justify-center relative"
                              >
                                <div className="relative">
                                  <item.icon className="w-[18px] h-[18px]" />
                                  {hasActiveChild(item) && (
                                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full border border-white animate-pulse" />
                                  )}
                                </div>
                              </SidebarMenuButton>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent side="right" align="start" className="w-48">
                          {item.children?.map((child) => {
                            const childActive = isActive(child.href);
                            return (
                              <DropdownMenuItem key={child.id} asChild>
                                <Link 
                                  href={child.href || "#"}
                                  className={cn(
                                    "flex items-center gap-2 cursor-pointer",
                                    childActive && "bg-primary-light text-primary font-medium"
                                  )}
                                >
                                  <child.icon className="w-4 h-4" />
                                  <span>{child.label}</span>
                                </Link>
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  );
                })}
              </div>
            )}
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
                {!isCollapsed ? (
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
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton 
                        asChild 
                        isActive={itemActive}
                        className={cn(
                          "sidebar-menu-item justify-center",
                          itemActive && "sidebar-menu-item-active"
                        )}
                      >
                        <Link href={item.href || "#"}>
                          <item.icon className="w-[18px] h-[18px]" />
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* User Profile Menu */}
        <AppSidebarUserMenu />
      </SidebarFooter>
      <SidebarRail />
      </TooltipProvider>
    </Sidebar>
  );
}