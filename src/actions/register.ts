"use server"


import { registerForm } from '@/schema'
import * as z from 'zod'

import bcrpt from 'bcryptjs'
import { User } from '@/models/userSchema'
import { DbConnected } from '@/lib/db'
import { sendEmail } from '@/lib/sendEmail'
import { redirect } from 'next/navigation'
import { generateEmailVerificationToken } from '@/lib/token'



export const register=async(value:z.infer<typeof registerForm>)=>{

    const validated=registerForm.safeParse(value)

    if(!validated.success){
        return {error:'Invalid field'}
    }

    const {name,password,email}=validated.data

    // IS USER ALREADY EXISTING OR NOT
    await DbConnected()

    const existingUser=await User.findOne({email:email})

    if(existingUser){
        return {error:'user already existing'}
    }

    //HASHING USER PASSWORD
    const hashPassword=await bcrpt.hash(password,10)

    //CREATE USER

    const createUser=await User.create({
        name,
        email,
        password:hashPassword,
        
        
    })

    // send email to email verification

    if(!createUser.isEmailVerified){
      const verificationToken=await generateEmailVerificationToken(createUser.email)
      
        const html=`<a href="http://localhost:3000/auth/email-verification?token=${verificationToken.token}">click here to Verification email</a>`
      const subject='verification your Email'

     const data=await  sendEmail(createUser.email,html,subject)

     if(data?.success){

        return {success:"send vefication email"}
     }


    }

    

    return redirect('/auth/login')

}