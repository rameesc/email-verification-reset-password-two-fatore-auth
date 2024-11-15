

"use client"


import React, { useState, useTransition } from 'react'
import { CardWrapper } from './CardWrapper'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { loginForm, newPasswors, registerForm } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { register } from '@/actions/register'
import { ErrorItema } from '../Error-popap'
import { SuccessItema } from '../Success-popap'
import { login } from '@/actions/login'
import Link from 'next/link'
import ClipLoader from "react-spinners/ClipLoader";
import { useSearchParams } from 'next/navigation'
import { changeNewPassword } from '@/actions/newPassword'


export const NewPasswordForm = () => {
    const [success,setSuccess]=useState<string | undefined>('')
    const [error,setError]=useState<string | undefined>('')

    const patchname=useSearchParams()

    const token=patchname.get("token")

    const [isPendding,transition]=useTransition()
    const form=useForm<z.infer <typeof newPasswors> >({
        resolver:zodResolver(newPasswors),
        defaultValues:{
            password:''
        }
    })
   
    const onSubmit=(value:z.infer <typeof newPasswors>)=>{

        if(!token){
            setError("token miss")
        }

        transition(()=>{
            if(!token) return setError("token miss")
            changeNewPassword(token,value)
        .then((res)=>{
            setError(res.error)
            setSuccess(res.success)
        })


        })

    }
  return (
    <div>
        <CardWrapper
          cardTitleLabel={'Change Password'}
          cardBackUrl='/auth/login'
          cardDescription='back to login'
          cardbackUrlLabel='login'
          socialIcon={false}
        >
            <Form {...form}>
                
                <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className=' space-y-4 w-[400px]'
                >
                    
                    
                    <FormField
                     control={form.control}
                     name="password"
                     render={({field})=>{
                     return   <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                 {...field}
                                 placeholder='******'
                                />
                            </FormControl>
                            
                            <FormMessage/>
                        </FormItem>
                     }}
                    
                    />
                    {success?<SuccessItema message={success}/>:<ErrorItema message={error} />}

                    <Button disabled={isPendding} className='w-full'>{isPendding ?<ClipLoader/>:"Change password"}</Button>

                </form>

            </Form>
          
        </CardWrapper>
    </div>
  )
}
