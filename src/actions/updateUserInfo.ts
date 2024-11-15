'use server'

import * as z from 'zod';
import {updateUser} from "@/schema"
import { getUser } from '@/lib/getUser';
import { User } from '@/models/userSchema';

import bcrypt from 'bcryptjs'
import {auth, unstable_update} from "@/auth"
import { useSession } from 'next-auth/react';


export const updateUserInfo=async(values:z.infer <typeof updateUser>,id:string)=>{


    
    const validated=updateUser.safeParse(values)

   

    

       const user=await getUser()
        

    if(!validated.success){
        return {error:'Invalid field'}
    }
    const {email,password} =validated.data

    const exstingUser=await User.findById(user.id)

    const exstingUserByEmail= await User.findOne({email})

    if(!exstingUser){
        return {error:"Invalid user"}

    }
    
    
   
  
       
    if(values.email && values.email!==user?.email){

        if(exstingUserByEmail && exstingUserByEmail._id!==exstingUser._id){
            return {error:"email already existing"}
        }
    }
    

    if(values.password){
        const hashPassword=await bcrypt.hash(values.password,10)
        values.password=hashPassword

    }

    
   

   const upadteItems= await User.findByIdAndUpdate(exstingUser._id,{
         
        ...values
    })

    if(upadteItems){

       

       
       


        return {success:"updated"}
    }

    


    

}