'use client';

import Link from 'next/link';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
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
