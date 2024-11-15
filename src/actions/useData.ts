'use server'

import { User } from "@/models/userSchema"




export const UserAllData=async()=>{

    try{
        const user=await User.find({})

        return {all:JSON.stringify(user)}


    }catch(error){
        return {error:"something wenr wrong"}
    }
}