"use server"
import { getResetTokenByToken } from "@/data/resetPassword";
import { getUserByEmail } from "@/data/user";
import { newPasswors } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { User } from "@/models/userSchema";
import { DbConnected } from "@/lib/db";
import { ResetPassword } from "@/models/resetSchema";


export const changeNewPassword=async(token:string,value:z.infer<typeof newPasswors>)=>{

    const validetion=newPasswors.safeParse(value);

    if(!validetion.success){
        return {error:"Invalid field"}
    }

    const {password}=validetion.data;

    //CHECK TOKEN EXISTING OR NOT

    const existingToken=await getResetTokenByToken(token)

    if(!existingToken){
        return {error:"Invalid token"}
    }
    const existingUser=await getUserByEmail(existingToken.email)

    if(!existingUser){
        return {error:"Invalid User "}
    }

    //HASHING PASSWORD

    const hashPassword=await bcrypt.hash(password,10)


    //UPDATE NEW PASSWORD
    await DbConnected()

  const update=  await User.findByIdAndUpdate(existingUser._id,{
        password:hashPassword,
        email:existingToken.email

    })

    if(update){

        await ResetPassword.findByIdAndDelete(existingToken._id)
    }

    return {success:"changed password"}


}