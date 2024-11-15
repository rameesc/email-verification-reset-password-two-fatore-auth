
'use client'

import { userRemove } from '@/actions/removeUser'
import { UserAllData } from '@/actions/useData'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from "sonner"

interface RemoveBtnProps{
    id:string
}

export const RemoveUserBtn = ({id}:RemoveBtnProps) => {
    const RemoveHandle=async(id:string)=>{
       const data=await  userRemove(id)

       if(data?.success){
        return toast(data.success)
       }
     
       if(data?.error){
        return toast(data.error)
       }
     
      

    }
  return (
    <Button className='bg-red-600' onClick={()=>RemoveHandle(id)}>Delete</Button>
  )
}
