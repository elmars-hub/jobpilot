"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    comingSoon?: boolean;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(item.url + "/");

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <Link href={item.comingSoon ? "#" : item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.comingSoon && (
                    <Badge
                      variant="secondary"
                      className="ml-auto text-[10px] px-1.5 py-0"
                    >
                      Soon
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
