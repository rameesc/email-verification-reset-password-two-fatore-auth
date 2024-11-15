'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { CardWrapper } from './CardWrapper'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { loginForm, registerForm } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { register } from '@/actions/register'
import { ErrorItema } from '../Error-popap'
import { SuccessItema } from '../Success-popap'
import { login } from '@/actions/login'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const LoginForm = () => {

    const [success,setSuccess]=useState<string | undefined>('')
    const [error,setError]=useState<string | undefined>('')
    const [isTwoFactor,setIsTwoFactor]=useState<boolean | undefined>(false)

    const pathname=useSearchParams();
    const errors=pathname.get("error")

    useEffect(()=>{
        if(errors){

            return setError(errors)
        }
    },[errors])

    const [isPendding,transition]=useTransition()
    const form=useForm<z.infer<typeof loginForm>>({
        resolver:zodResolver(loginForm),
        defaultValues:{
           
            email:'',
            password:"",
            code:''
           
        }
    })

    const onSubmit=(value:z.infer<typeof loginForm>)=>{
             
        console.log(value)
       
            transition(()=>{
                setError('')
                setSuccess('')
                login(value)
             .then((res)=>{
               if(res?.error){
                form.reset()
                setError(res?.error)
               }

               if(res?.success){
                form.reset()
                setSuccess(res?.success)
               }
                
               
                setIsTwoFactor(res?.isTwoFactor)
                
                  }).catch((error)=>console.log(error))


            })
        
        
       

    }


  return (
    <div>
        <CardWrapper
          cardTitleLabel={'Login'}
          cardBackUrl='/auth/register'
          cardDescription='You don,t have account'
          cardbackUrlLabel='Create An Account'
          socialIcon={true}
        >
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className=' space-y-4 w-[400px]'
                >
                  {!isTwoFactor&&(
                    <>
                         
                    <FormField
                     control={form.control}
                     name="email"
                     render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                 {...field}
                                 placeholder='Jone@gmail.com'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                      )}
                    
                    />

                    <FormField
                     control={form.control}
                     name="password"
                     render={({field})=>{
                     return   <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                 {...field}
                                 placeholder='******'
                                />
                            </FormControl>
                            <div className='py-2'>
                            <Link href='/auth/reset'><span className='text-blue-500'>forget password</span></Link>
                            </div>
                            <FormMessage/>
                        </FormItem>
                     }}
                    
                    />
                    </>
                  )}
                   {isTwoFactor&&(
                    <FormField
                     control={form.control}
                     name="code"
                     render={({field})=>{
                     return   <FormItem>
                            <FormLabel>TWO FACTOR CODE</FormLabel>
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
                )}    
                 
                   
                    
                    {success?<SuccessItema message={success}/>:<ErrorItema message={error} />}

                    <Button type="submit" disabled={isPendding} className='w-full'>{isTwoFactor?"confirmation":"login"}</Button>

                </form>

            </Form>
          
        </CardWrapper>
    </div>
  )
}

