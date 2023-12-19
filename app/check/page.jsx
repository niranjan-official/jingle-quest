'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import oops from '../../public/images/mistake.svg'
import { Router } from 'next/router'
import { useAuth } from '@/firebase/auth'
import Loading from '@/components/loading'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '../context'
import { getData, handleCompletion } from '../functions'

const Checker = () => {

    const User = useAuth();
    const Router = useRouter();
    const [email,setEmail]=useState('')
    const { load, setLoad } = useGlobalContext();

    useEffect(()=>{
        console.log(">>>>>",User);
        if(User){
            setLoad(false)
            setEmail(User.email)
            getCheck(User.email);
        }
    },[User])
    // useEffect(()=>{
    //     setInterval(() => {
    //             setLoad(false)
    //             if(email){
    //                 getCheck();
    //             }
    //             console.log(email);
    //     }, 3000);
    // },[])
    const getCheck=async()=>{
            console.log("called");
            const userData = await getData("users",User.email)
            const check = userData.qr
            if(check){
                handleCompletion(User.email)
                Router.push("/completion");
            }else{
                setTimeout(() => {
                    getCheck(User.email)
                }, 2000);
            }
    }
if(User){
    if(!load){

    return (
      <div className="bg-color h-screen primary-bg items-center justify-center text-center p-4">
        <div className='text-2xl text-white flex flex-col'>
        <div className='w-full h-auto'>
          <Image src={oops} width={0} height={0} alt='trophy' style={{ height: "100%", width: "100%"}} />
        </div>
          <h1>Forgot to scan the QR codes on each spot ???</h1>
          <h1 className='mt-2'>Go fast and do it so to complete the game.</h1>
          <h1 className='mt-4 font-semibold'>Hurry Up !!!</h1>
        </div>
      </div>
    )
    }else{
        return <Loading/>
    }
}
}

export default Checker
