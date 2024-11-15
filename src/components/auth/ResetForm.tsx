'use client'






import * as z from "zod"
import { resetPasswors } from '@/schema'
import React,{useState,useTransition} from 'react'
import { CardWrapper } from "./CardWrapper"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form"
import { ErrorItema } from "../Error-popap"
import { SuccessItema } from "../Success-popap"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { restPasswordAction } from "@/actions/resetAction"
import ClipLoader from "react-spinners/ClipLoader";

const ResetForm = () => {
    const [success,setSuccess]=useState<string | undefined>('')
    const [error,setError]=useState<string | undefined>('')

    const [isPendding,transition]=useTransition()
    const form=useForm<z.infer <typeof resetPasswors>>({
        resolver:zodResolver(resetPasswors),
        defaultValues:{
            email:""
        }
    })

    const onSubmit=(value:z.infer<typeof resetPasswors>)=>{

        transition(()=>{
            //action
           restPasswordAction(value)
           .then((res)=>{
            setError(res?.error)
            setSuccess(res?.success)
           })
        })

    }
  return (
    <CardWrapper
          cardTitleLabel={'Reset Passwor'}
          cardBackUrl='/auth/login'
          cardDescription='back to Login'
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
                   
                    {success?<SuccessItema message={success}/>:<ErrorItema message={error} />}

                    <Button disabled={isPendding} className='w-full'>{isPendding?<ClipLoader/>:"submit"}</Button>

                </form>

            </Form>
          
        </CardWrapper>
  )
}

export default ResetForm