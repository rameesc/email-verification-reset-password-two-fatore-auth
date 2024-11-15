
import { ROLE } from '@/lib/userRole'
import * as z from 'zod'



export const registerForm=z.object({
    name:z.string().min(2),
    email:z.string().email(),
    password:z.string().min(6)

})

export const loginForm=z.object({
  
    email:z.string().email(),
    password:z.string().min(6),
    code:z.optional(z.string())

})
export const resetPasswors=z.object({
  
   
    email:z.string().email(),

})
export const newPasswors=z.object({
  
   
    password:z.string().min(6)

})

export const updateUser=z.object({
    name:z.optional(z.string()),
    isTwoFactorEnable:z.optional(z.boolean()),
    email:z.optional(z.string().email()),
    role:z.optional(z.enum([ROLE.ADMIN,ROLE.USER])),
    password:z.optional(z.string().min(6)),
    newPassword:z.optional(z.string().min(6))

})
.refine((data)=>{
    if(data.password && !data.newPassword){
        return false
    }
    return true
},{
    message:'new password is required',
    path:['newPassword']
})
.refine((data)=>{
    if(!data.password && data.newPassword){
        return false
    }
    return true
},{
    message:' password is required',
    path:['password']
})

