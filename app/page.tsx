"use client"

import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <Loader />
    )
  }

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  return (
    <>
      <Button variant={'outline'} onClick={() => { router.push('/dashboard') }}>
        Dashboard
      </Button>
      <div>
        <h1>Welcome, {fullName || user.username || "User"}!</h1>
      </div>
    </>
  )
}

export default page