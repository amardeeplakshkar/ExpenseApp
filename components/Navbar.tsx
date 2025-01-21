'use client'

import { LogOut, MoonIcon, SunIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'
import UserAvatar from './Avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

const Navbar = () => {
    const { theme, setTheme, systemTheme } = useTheme()

    const currentTheme = theme === 'system' ? systemTheme : theme

    const toggleTheme = () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light')
    }
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        // Simulate a data fetch
        const fetchData = async () => {
            // Simulate a delay (for demonstration)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false); // Set loading to false after fetching data
        };

        fetchData();
    }, []);
    return (
        <nav className="flex items-center justify-between p-4 transition-colors duration-300">
            <Button variant="ghost" onClick={toggleTheme}>
                {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <h2 className="font-bold">Expenses</h2>
            <DropdownMenu>
                <DropdownMenuTrigger className='outline-none '>
                {
                    loading ? (
                        <Skeleton className='h-[2rem] aspect-square rounded-full' />
                    ) :
                       <UserAvatar/>
                }
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-2'>
                    {/* <span className='cursor-pointer'>Account Details</span>
                    <DropdownMenuSeparator/> */}
                    <SignOutButton/>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}

export default Navbar
