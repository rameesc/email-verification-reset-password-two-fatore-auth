import { DbConnected } from "@/lib/db"
import { User } from "@/models/userSchema"



export const getUserByEmail=async(email:string)=>{

    try{
        await DbConnected()

        const isUser=await User.findOne({email})

        return isUser


    }catch(error){

        return {error:'something went wrong'}
    }

}
export const getUserById=async(id:string)=>{

    try{
        await DbConnected()

        const isUser=await User.findById(id)

        return isUser


    }catch(error){

        return {error:'something went wrong'}
    }

}