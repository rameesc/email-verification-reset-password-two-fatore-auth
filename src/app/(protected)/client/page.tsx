"use client"



import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@/hooks/user'
import { useSession } from 'next-auth/react'
import React from 'react'


const ClientPage = () => {
    
    const user=useUser()
   
  return (
    <div>
        <Card className='w-[500px] flex flex-col justify-center items-center'>
            <CardHeader>
                <CardTitle className='text-[30px]'>Client Component</CardTitle>
               
            </CardHeader>
            <CardContent className='w-full flex flex-col gap-2'>
                <div className='flex justify-between w-full border-2 p-2 rounded-md'>
                    <p>Name</p>
                    <p>{user?.name}</p>
                </div>
                <div className='flex justify-between w-full border-2 p-2 rounded-md'>
                    <p>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div className='flex justify-between w-full border-2 p-2 rounded-md'>
                    <p>id</p>
                    <p>{user?.id}</p>
                </div>
                <div className='flex justify-between w-full border-2 p-2 rounded-md'>
                    <p>Role</p>
                    <p>{user?.role}</p>
                </div>
                <div className='flex justify-between w-full border-2 p-2 rounded-md'>
                    <p>isTwoFactorEnable
                    </p>
                    <p className='bg-red-300 p-2 rounded-lg'>{user?.isTwoFactorEnable?'On':"Off"}</p>
                </div>

            </CardContent>
        </Card>
    </div>
  )
}

export default ClientPage