import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, BookOpen, Dumbbell, ListChecks, Users, TrendingUp, User, Square, Settings, FileText } from 'lucide-react';

export function AppSidebar() {
  const location = useLocation();
  
  const mainMenuItems = [
    { title: 'Dashboard', icon: Home, href: '/' },
    { title: 'Daily Reading', icon: BookOpen, href: '/reading' },
    { title: 'Workout', icon: Dumbbell, href: '/workout' },
    { title: 'Disciplines', icon: ListChecks, href: '/disciplines' },
  ];

  const communityItems = [
    { title: 'Brotherhood', icon: Users, href: '/brotherhood' },
    { title: 'Progress', icon: TrendingUp, href: '/progress' },
  ];

  const settingsItems = [
    { title: 'Profile', icon: User, href: '/profile' },
    { title: 'Vision Setup', icon: FileText, href: '/vision-setup' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Square className="text-cornerstone-gold" size={28} strokeWidth={2.5} />
          <div>
            <h1 className="text-lg font-bold text-cornerstone-charcoal">CORNERSTONE: 90</h1>
            <p className="text-xs text-cornerstone-stone">Built on the Rock</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <p className="text-xs text-center text-cornerstone-stone">
          Building on Christ, the Cornerstone
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
