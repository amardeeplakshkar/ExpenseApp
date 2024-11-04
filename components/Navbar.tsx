'use client'

import { LogOut, MoonIcon, SunIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'

const Navbar = () => {
    const { theme, setTheme, systemTheme } = useTheme()

    const currentTheme = theme === 'system' ? systemTheme : theme

    const toggleTheme = () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <nav className="flex items-center justify-between p-4 transition-colors duration-300">
            <Button variant="ghost" onClick={toggleTheme}>
                {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <h2 className="font-bold">Expenses</h2>
            <Button variant="ghost">
                <LogOut />
            </Button>
        </nav>
    )
}

export default Navbar
