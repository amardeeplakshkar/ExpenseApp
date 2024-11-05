"use client"
import { useUser } from '@clerk/nextjs';
import { LiveEmoji } from 'liveemoji';
import React from 'react';
import { Skeleton } from './ui/skeleton';

const Loader = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return (<div className="flex flex-col items-center justify-center pt-[25dvh]">
            <Skeleton className='w-[10rem] aspect-square rounded-full' />
            <Skeleton className="w-[16rem] h-[20px] rounded-full" />
        </div>);
    }

    const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
    return (
        <div className="flex flex-col items-center justify-center pt-[25dvh]">
            <LiveEmoji icon='Alien' size='10rem' />
            <h1>Welcome, {fullName || user.username || "User"}!</h1>
        </div>
    );
};

export default Loader;
