

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginForm } from "./schema"
import { getUserByEmail, getUserById } from "./data/user"

import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { ROLE } from "./lib/userRole"
import { User } from "./models/userSchema"
import { DbConnected } from "./lib/db"
import { TwoFactorConfirmation } from "./models/twofactorschema"


 
export const { handlers, signIn, signOut, auth ,unstable_update} = NextAuth({
  providers: [

    Google({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET
    }),
    GitHub({
        clientId:process.env.AUTH_GITHUB_ID,
        clientSecret:process.env.AUTH_GITHUB_SECRET,
    }),

    Credentials({
        
      

       async authorize(credentials, request) {

        

           const validated= loginForm.safeParse(credentials)

            

           if(validated.success){

            const {email,password}=validated.data

            //is user in your db or not

            const isUser=await getUserByEmail(email)

            if(!isUser || !isUser.password){

               return null
            }

            //is matching password or not

            const matchingpassword=await bcrypt.compare(password,isUser.password)

            if(matchingpassword){

                return isUser
            }
            return null



           }
           return null
        },
        
    }),

    
  ],
  pages:{
    signIn:"/auth/login",
    error:'/auth/login'
  },

  callbacks:{

    

    async session({user,token,session}){
      
     
      
      if(session && token){
        session.user.email=token.email as string,
        session.user.name=token.name,
        session.user.id=token.id as string,
        session.user.role=token.role as String
        session.user.isTwoFactorEnable=token.isTwoFactorEnable as boolean
        session.user.provider= token.provider


      }
      const existingUser=await getUserById(token.id)
      
      if(existingUser){

        session.user.role=existingUser.role,
        session.user.name=existingUser.name
        session.user.email=existingUser.email,
        session.user.id=existingUser._id
        session.user.isTwoFactorEnable=existingUser.isTwoFactorEnable


      }

       return session
    },

   async jwt({token,user,account,profile}){
           
          
        
           
          
          
            // if(!token) return token
            console.log({token,user,account,profile})

            if(user && token){
              const existingUser=await getUserByEmail(token.email)
              
              if(existingUser){
                token.provider=account?.provider
                token.role=existingUser.role,
                token.name=existingUser.name,
                token.email=existingUser.email,
                token.id=existingUser._id
                token.isTwoFactorEnable=existingUser.isTwoFactorEnable


              }


            }
           
            
           
             
            


            return token

             
    },
    async signIn({user,account,profile}){
    
        
      if(account?.provider==="google" && profile?.email){
       
       
        

        const existingUser=await getUserByEmail(user.email as string)
         
        if(existingUser){

        
         return true
          
        }
          await DbConnected()
        const createUser=  await User.create({
           email: user.email,
           name: user.name,
           image: user.image
          })
         

          return createUser

        

        
       
        

      }

       if(account?.provider=="credentials"){

        const IsUser=await getUserById(user.id as string)
        
        if(!IsUser.isEmailVerified) return false

        //send email verification email

        //TWO factore

        if(IsUser.isTwoFactorEnable && IsUser.email) {

             const exstingcomfirmation=await TwoFactorConfirmation.findOne({user:IsUser._id})

             if(!exstingcomfirmation){
               return false
             }
             await TwoFactorConfirmation.findByIdAndDelete(exstingcomfirmation._id)
        }

        
        return IsUser
        
       } 
       return true

       

    },

  }
})