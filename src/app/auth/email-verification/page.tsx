'use client'
import { emailVerification } from '@/actions/emailVerification';
import { CardWrapper } from '@/components/auth/CardWrapper'
import { ErrorItema } from '@/components/Error-popap';
import { SuccessItema } from '@/components/Success-popap';
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const EmailVerification = () => {
    const pathname=useSearchParams()
    const token=pathname.get("token")

    const [success,setSuccess]=useState<string |undefined>('')
    const [error,setError]=useState<string |undefined>('')

    const onSubmit=useCallback(()=>{

        if(!token) return setError('token miss')
         console.log(token)
        emailVerification(token)
        .then((res)=>{
            if(res.error){
                setError(res.error)
            }
            if(res.success){
                setSuccess(res.success)
            }

        })


    },[token])

    useEffect(()=>{
        onSubmit()

    },[onSubmit])
  return (
    <div>
        <CardWrapper
          cardTitleLabel='Verification Email'
          cardBackUrl='/auth/login'
          cardDescription=''
          cardbackUrlLabel='bacl to login'
          socialIcon={false}
        >
            <div className='flex flex-col gap-5'>
                {!success && !error &&(
                    <ClipLoader/>
                )}
                {success?<SuccessItema message={success}/>:<ErrorItema message={error}/>}

            </div>
            

        </CardWrapper>
    </div>
  )
}

export default EmailVerification