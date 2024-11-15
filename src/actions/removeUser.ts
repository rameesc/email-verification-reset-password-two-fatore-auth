'use server'

import { DbConnected } from "@/lib/db"
import { getUser } from "@/lib/getUser"
import { ROLE } from "@/lib/userRole"
import { User } from "@/models/userSchema"
import { UserAllData } from "./useData"



export const userRemove=async(id:string)=>{

    try{
        await DbConnected()
        const user=await getUser()

        if(user.role!==ROLE.ADMIN){
            return {error:"this admin route"}
        }

        const userRemove=await User.findByIdAndDelete(id)

        if(userRemove){
           
            return {success:'removed'}
        }


    }catch(error){
        return {error:"error"}
    }
}