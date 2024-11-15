"use server";
import { getUserByEmail } from "@/data/user";
import { sendEmail } from "@/lib/sendEmail";
import { generateResetPasswordToken } from "@/lib/token";
import { resetPasswors } from "@/schema";
import * as z from "zod"


export const restPasswordAction=async(value:z.infer<typeof resetPasswors>)=>{


    const validated=resetPasswors.safeParse(value)

    if(!validated.success){
        return {error:"Invalid email"}
    }

    const {email}=validated.data;

    //IS USER EXISTING OR NOT
    const existingUser=await getUserByEmail(email)

    if(!existingUser){
        return {error:"user not found and try"}
    }

    /// GENERATE RESET PASSWORD TOKEN

    const createToken=await generateResetPasswordToken(existingUser.email);

    const hasExpiredToken=new Date(createToken.expire) < new Date()

    if(hasExpiredToken){

        return {error:"token expired"}
    }



    //SEND EMAIL TO CHANGE YOU PASSWORD

    const link=`http://localhost:3000/auth/change-password?token=${createToken.token}`

    const html=`<a href="${link}">change Password</a>`

    const subject="Change Password"

    const data=await sendEmail(createToken.email,html,subject)

    //CHECK YOUR EMAIL

    if(data?.success){

        return {success:"send email"}
    }


}