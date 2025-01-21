import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const UserAvatar = () => {
    const { user } = useUser()
    return (
        <Avatar className="">
            <AvatarImage src={user?.imageUrl}/>
            <AvatarFallback className="bg-gradient-to-t from-blue-500 to-pink-500 text-white uppercase p-4">
                {user?.firstName?.slice(0, 1)}
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar