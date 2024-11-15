'use server';

import { signIn } from '@/auth';
import { getTwoFactorTokemByToken } from '@/data/twoFactorToken';
import { getUserByEmail } from '@/data/user';
import { DbConnected } from '@/lib/db';
import { sendEmail } from '@/lib/sendEmail';
import { generateEmailVerificationToken, generateTwoFactorToken } from '@/lib/token';
import { TwoFactorConfirmation } from '@/models/twofactorschema';
import { User } from '@/models/userSchema';
import { loginForm } from '@/schema';
import bcryp from "bcryptjs"

import { redirect } from 'next/navigation';
import * as z from 'zod'


export const login=async(value:z.infer<typeof loginForm>)=>{

   const validated= loginForm.safeParse(value)

   if(!validated.success){

     return {error:"Invalid field"}
   }

   const {email ,password,code}=validated.data;

   //IS USER IN DB USER
   await DbConnected()

   const isUser=await User.findOne({email:email});

   if(!isUser){
    return {error:'user not found'}
   }

   //MATHING HASH PASSWORD
   const isPasswordMath=await bcryp.compare(password,isUser.password)

   if(!isPasswordMath){
    return {error:'Invalid email and password'}
   }

   //send email for verification email

   if(!isUser.isEmailVerified){

    const verificationToken=await generateEmailVerificationToken(email)
    const html=`<a href="http://localhost:3000/auth/email-verification?token=${verificationToken.token}">click here to Verification email</a>`
    const subject='verification your Email'

     const data=await  sendEmail(verificationToken.email,html,subject)

     if(data?.success){

        return {success:"send vefication email"}
     }

   




   }


   //TWO FOCTOR AUTH
   
   if(isUser.isTwoFactorEnable && isUser.email){

      if(code){

         const exstingToken=await getTwoFactorTokemByToken(code)

         if(!exstingToken){
            return {error:"Invalid code"}
         }

         if(exstingToken.token!==code){
            return {error:"Invalid code"}

         }
         const hasExpire=new Date(exstingToken.expire)< new Date()

         if(hasExpire){
            return {error:'token expired'}
         }

         const exstingUser=await getUserByEmail(exstingToken.email)

         if(!exstingUser){
            return {error:"Invalid User"}

         }

         

         await DbConnected()

        const exstingTokenConfire=  await TwoFactorConfirmation.findOne({user:exstingUser._id})

        if(exstingTokenConfire){
         await TwoFactorConfirmation.findByIdAndDelete(exstingTokenConfire._id)

        }

        await TwoFactorConfirmation.create({
         user:exstingUser._id
        })



      }else{

         const twoFactoreTokentoken=await generateTwoFactorToken(isUser.email)
       
       const subject='TWO FACTOR VERIFICATION'
       const html=`<h1 style="color:red;" >${twoFactoreTokentoken.token}</h1>`
       const data =await sendEmail(
          twoFactoreTokentoken.email,
         
         html,
         subject,
       )

       console.log(data)

       if(data){
         return {
           
            isTwoFactor:true
         }
       }

      }

      
   }



   await signIn("credentials",{
    email,
    password,
   
    
   })

}