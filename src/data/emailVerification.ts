import { DbConnected } from "@/lib/db"

import {VerificationEmail} from "@/models/verificationSchema"

import {ResetPassword} from '@/models/resetSchema'

export const getEmailVerificatioTokenByEmail=async(email:string)=>{

    try{
        await DbConnected()

        const vericationToken=await VerificationEmail.findOne({email:email})
        
        return vericationToken


    }catch(error){
        return {error:"something went wrong"}
    }
}
export const getEmailVerificatioTokenByToken=async(token:string)=>{

    try{
        await DbConnected()

        const vericationToken=await VerificationEmail.findOne({token})
        
        return vericationToken


    }catch(error){
        return {error:"something went wrong"}
    }
}


export const getEmailResetPasswordToke=async(email:string)=>{

    try{
        await DbConnected()

        const resetToken=await ResetPassword.findOne({email});


        return resetToken


    }catch(error){
        return {error:"something went wrong"}
    }
}