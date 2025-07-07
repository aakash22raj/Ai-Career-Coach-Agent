import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { UserButton, UserProfile } from '@clerk/nextjs'


function AppHeader() {
    return (
        <div className='p-4 shadow-sm flex items-center justify-between w-full'>
            <SidebarTrigger />
            <div className='mr-5'>
                <UserButton 
                    appearance={{
                        elements: {
                          userButtonAvatarBox: "w-8 h-8 ring-1 ring-blue-700",
                        }
                    }} 
                />
            </div>
        </div>
    )
}

export default AppHeader