'use client'




import { LogOutBtn } from '@/components/auth/LogOutBtn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export const Navbar = () => {

    const pathName=usePathname()

    console.log(pathName)
  return (
    <nav className='bg-white p-5 rounded-md flex  gap-3'>
        
        <Button variant={pathName=="/setting"?"default":"outline"}>
            <Link href={'/setting'}>settings</Link>
        </Button>
        <Button variant={pathName=="/client"?"default":"outline"}>
            <Link href={'/client'}>client</Link>
        </Button>
        <Button variant={pathName=="/server"?"default":"outline"}>
            <Link href={'/server'}>server</Link>
        </Button>
        <Button  variant={pathName=="/user-data"?"default":"outline"}>
            <Link href={'/user-data'}>user Date</Link>
        </Button>
        
            <LogOutBtn outline='outline'/>
        
       
      
    </nav>
  )
}
