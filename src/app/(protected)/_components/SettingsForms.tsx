'use client'



import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUser } from '@/hooks/user'
import { updateUser } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, {  useEffect, useTransition,useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Switch } from "@/components/ui/switch"

import { ROLE } from '@/lib/userRole'
import { useSession } from 'next-auth/react'
import { updateUserInfo } from '@/actions/updateUserInfo'
import { SuccessItema } from '@/components/Success-popap'
import { ErrorItema } from '@/components/Error-popap'


export const SettingsForms = () => {
  const user=useUser()
  const {update}=useSession()

  const [success,setSuccess]=useState<string | undefined>('')
  const [error,setError]=useState<string | undefined>('')
   
    const [isPending,transition]=useTransition()

   


   


    const form=useForm<z.infer <typeof updateUser>>({
        resolver:zodResolver(updateUser),
        defaultValues:{
            name:user?.name || undefined,
            email:user?.email || undefined,
            role:user?.role || undefined,
            password:undefined,
            newPassword:undefined,
            isTwoFactorEnable:user?.isTwoFactorEnable 
            
           
           
           
        }
    })

    const onsubmit=(value:z.infer <typeof updateUser>)=>{

      transition(()=>{
        updateUserInfo(value, user?.id as string)
        .then((res)=>{
          
          setError(res?.error)
          setSuccess(res?.success)
          
        })

      })
       

    }

  return (
    <div>
        <Card className='w-[500px] flex flex-col justify-center items-center'>
            <CardHeader>
                <CardTitle className='text-[30px]'>Settings</CardTitle>
           
            </CardHeader>
            {success?<SuccessItema message={success}/>:<ErrorItema message={error}/>}

            <CardContent>
                <Form  {...form}>
                    <form className=' space-y-3 w-[100%]'  onSubmit={form.handleSubmit(onsubmit)}>
                        <FormField
                          control={form.control}
                          name='name'
                          render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                      {...field}
                                     placeholder='name'
                                     value={field.value}
                                     defaultValue={user?.name ||''}
                                      disabled={isPending}

                        
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        
                        />

                      {user?.provider=='credentials'&&  <FormField
                          control={form.control}
                          name='email'
                          render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                      {...field}
                                      placeholder='name@gmail.com'
                                      disabled={isPending}
                                      defaultValue={user?.email || ''}
                                      value={field.value}
                                    
                        
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        
                        />}
                        {user?.provider=='credentials'&& <FormField
                          control={form.control}
                          name='password'
                          render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                      {...field}
                                      placeholder='******'
                                      disabled={isPending}

                        
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        
                        />}
                        {user?.provider=='credentials'&& <FormField
                          control={form.control}
                          name='newPassword'
                          render={({field})=>(
                            <FormItem>
                                <FormLabel>newPassword</FormLabel>
                                <FormControl>
                                    <Input
                                      {...field}
                                      placeholder='******'
                                      disabled={isPending}
                                    

                        
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        
                        />}

                        <FormField
                          control={form.control}
                          name='role'
                          render={({field})=>(
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select
                                 disabled={isPending}
                                 onValueChange={field.onChange}
                                value={field.value}
                                
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="select a role"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={ROLE.ADMIN}>
                                            {ROLE.ADMIN}
                                        </SelectItem>
                                        <SelectItem value={ROLE.USER}>
                                            {ROLE.USER}
                                        </SelectItem>
                                    </SelectContent>

                                </Select>
                                
                                <FormMessage/>
                            </FormItem>
                          )}
                        
                        />
                        {user?.provider=='credentials'&& <FormField
                          control={form.control}
                          name='isTwoFactorEnable'
                          render={({field})=>(
                            <FormItem className='flex gap-4 justify-between items-center '>
                                <div>
                                 <FormLabel>isTwoFactorEnable</FormLabel>
                                 <FormDescription>
                                    Enable two factor Authentication for your account
                                 </FormDescription>
                                </div>
                                
                                <FormControl>
                                    <Switch 
                                     disabled={isPending}
                                     checked={field.value}
                                     defaultChecked={field.value}
                                    
                                    
                                     onCheckedChange={field.onChange}
                                    />

                                </FormControl>
                                
                               
                            </FormItem>
                          )}
                        
                        />}
                        <Button type="submit" >submit to Update</Button>
                    </form>
                </Form>

            </CardContent>

        </Card>
    </div>
  )
}
