'use client'

import React, { useState, useTransition } from 'react'
import { CardWrapper } from './CardWrapper'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { registerForm } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { register } from '@/actions/register'
import { ErrorItema } from '../Error-popap'
import { SuccessItema } from '../Success-popap'

export const RegisterForm = () => {

    const [success,setSuccess]=useState<string | undefined>('')
    const [error,setError]=useState<string | undefined>('')

    const [isPendding,transition]=useTransition()
    const form=useForm<z.infer<typeof registerForm>>({
        resolver:zodResolver(registerForm),
        defaultValues:{
            name:'',
            email:'',
            password:""
        }
    })

    const onSubmit=(value:z.infer<typeof registerForm>)=>{
            transition(()=>{
                setError('')
                setSuccess('')
                register(value)
             .then((res)=>{
             if(res.error){
                setError(res.error)
                
             }
             if(res.success){
                setSuccess(res.success)

             }
        })


            })
        
        
       

    }


  return (
    <div>
        <CardWrapper
          cardTitleLabel={'Create User'}
          cardBackUrl='/auth/login'
          cardDescription='You don,t have account'
          cardbackUrlLabel='login'
          socialIcon={true}
        >
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className=' space-y-4 w-[400px]'
                >
                    <FormField
                     control={form.control}
                     name="name"
                     render={({field})=>{
                      return  <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                 {...field}
                                 placeholder='Jone'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                     }}
                    
                    />
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
                            <FormMessage/>
                        </FormItem>
                     }}
                    
                    />
                    {success?<SuccessItema message={success}/>:<ErrorItema message={error} />}

                    <Button disabled={isPendding} className='w-full'>Create User</Button>

                </form>

            </Form>
          
        </CardWrapper>
    </div>
  )
}

