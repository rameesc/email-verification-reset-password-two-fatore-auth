'use client'

import { signIn } from 'next-auth/react';
import React from 'react'

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";


export const SocialIcon = () => {

    const signInWithGithub=()=>{
        signIn("github",{
            redirectTo:"/"
        })

    }
    const signInWithGoogle=()=>{
        signIn("google",{
            redirectTo:"/"
        })

    }


  return (
    <div className=' grid gap-3 grid-cols-2 w-[100%]'>
        <div onClick={signInWithGithub} className=' cursor-pointer border border-black flex justify-center items-center p-3 rounded-md'>
            <FaGithub size={30}/>

        </div>
        <div onClick={signInWithGoogle} className=' cursor-pointer border border-black  flex justify-center items-center p-3 rounded-md'>
            <FaGoogle/>

        </div>
    </div>
  )
}
