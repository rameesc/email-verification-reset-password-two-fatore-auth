'use server'

import { getEmailVerificatioTokenByEmail, getEmailVerificatioTokenByToken } from "@/data/emailVerification"
import { getUserByEmail } from "@/data/user"
import { DbConnected } from "@/lib/db"
import { User } from "@/models/userSchema"
import { VerificationEmail } from "@/models/verificationSchema"



export const emailVerification=async(token:string)=>{

    if(!token){
        return {error:"token miss"}
    }
    await DbConnected()
    const isToken=await getEmailVerificatioTokenByToken(token)

    if(!isToken){
        return {error:"Invalid Token"}
    }

   
    
    const hasExpired=new Date(isToken.expire)< new Date()

    if(hasExpired){
        return {error:"Token Expired"}

    }
    
    const getUesr=await getUserByEmail(isToken.email)

    if(!getUesr){
        return {error:"Invalid Token email not match"}

    }
   

    await User?.findByIdAndUpdate(getUesr._id,{
        isEmailVerified:new Date(),
        email:getUesr.email
    })

   

    await VerificationEmail.findByIdAndDelete(isToken._id)

    return {success:"email Verified!"}

}