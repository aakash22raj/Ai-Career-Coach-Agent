import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Inbox, Layers, UserCircle, Wallet } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Workspace",
        url: "/dashboard",
        icon: Layers,
    },
    {
        title: "AI Tools",
        url: "/ai-tools",
        icon: Inbox,
    },
    {
        title: "My History",
        url: "/my-history",
        icon: Calendar,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: Wallet,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: UserCircle,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='pl-2 pt-4 pr-4'>
                    <Image src={'/logo.png'} alt='logo' width={1000} height={70}
                        className='w-full' />
                    <h2 className='text-sm text-gray-400 text-center mt-3'>Build Awesome Skills</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-2 ml-2 pr-1'>
                            {items.map((item, index) => (
                                // <SidebarMenuItem key={item.title} className='p-2'>
                                //     <SidebarMenuButton asChild className=''>
                                <a 
                                    href={item.url} 
                                    key={index} 
                                    className={`p-2 text-lg flex gap-3 items-center hover:bg-green-100 rounded-lg 
                                    ${path.includes(item.url) && 'bg-green-200'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                                //     </SidebarMenuButton>
                                // </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 ml-2 text-gray-400 text-sm'>Copyright @Optilytic</h2>
            </SidebarFooter>
        </Sidebar>
    )
}