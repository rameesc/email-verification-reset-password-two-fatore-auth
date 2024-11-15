import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const HoamePage =async () => {
  const user=await auth()
  return (
    <div  className='w-full h-screen flex justify-center items-center bg-gradient-to-r to-blue-500 from-red-300'>
      <Button  className='w-[200px]'>
        <Link  href='/auth/login'>Login</Link>
      </Button>
     
      
    </div>
  )
}

export default HoamePage