'use client'

import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

interface logoutProp{
  outline:string
}

export const LogOutBtn = ({outline}:logoutProp) => {
    const signOutfun=()=>{
        signOut()
    }
  return (
    <Button variant={outline?"outline":'default'} onClick={signOutfun}>Log Out</Button>
  )
}
