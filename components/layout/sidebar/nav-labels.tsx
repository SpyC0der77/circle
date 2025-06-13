'use client';

import {
   Archive,
   Bell,
   Box,
   ChevronRight,
   CopyMinus,
   Layers,
   Link as LinkIcon,
   MoreHorizontal,
   Settings,
} from 'lucide-react';
import Link from 'next/link';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { labels } from '@/mock-data/labels';

export function NavLabels() {
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Your labels</SidebarGroupLabel>
         <SidebarMenu>
            {labels.map((label) => (
               <SidebarMenuItem key={label.id}>
                  <SidebarMenuButton asChild tooltip={label.name}>
                     <Link href={`/lndev-ui/tasks?label=${label.id}`} className="flex items-center gap-2">
                        <span
                           className="inline-block w-3 h-3 rounded-full"
                           style={{ backgroundColor: label.color }}
                        />
                        <span className="text-sm">{label.name}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
