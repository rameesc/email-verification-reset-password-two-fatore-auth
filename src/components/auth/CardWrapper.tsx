
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'
import { SocialIcon } from './SocialIcon'

interface cardProps{
    children:React.ReactNode,
    cardTitleLabel:string,
    cardBackUrl:string
    cardDescription:string
    cardbackUrlLabel:string
    socialIcon:boolean

}

export const CardWrapper = ({
 children,
 cardTitleLabel,
 cardBackUrl,
 cardDescription,
 cardbackUrlLabel,
 socialIcon
}:cardProps) => {
  return (
    <Card className='w-[100%] lg:w-[500px] flex flex-col justify-center items-center'>
        <CardHeader>
            <CardTitle className='text-[30px]'>{cardTitleLabel}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter className='flex flex-col gap-3'>
            <div className='flex flex-col justify-center items-center border-b-2 border-blue-500 p-2'>
                <p className='text-[15px]'>{cardDescription}</p>
                <Link href={cardBackUrl}><span className=' underline text-blue-500'>{cardbackUrlLabel}</span></Link>
            </div>
            {socialIcon && <SocialIcon/>}

        </CardFooter>
    </Card>
    
  )
}
