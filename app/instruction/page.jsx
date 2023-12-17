'use client'
import React, { useEffect } from 'react'
import { getData, shuffle } from '../functions'
import { useRouter } from 'next/navigation'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuth } from '@/firebase/auth'
import { useGlobalContext } from '../context'
import Loading from '../../components/loading'
import Image from 'next/image'
import decor from "../../public/images/decor.svg"

const Instruction = () => {

  const router = useRouter()
  const { load, setLoad } = useGlobalContext()

  const User = useAuth()

  useEffect(() => {
    setLoad(true)
    const checkUserPath = async () => {
      const newpath = await getData("users", User.email)
    
      if (newpath.path.length > 0) {
        router.push("/scan")
      } else {
        setLoad(false)
      }
    }
    if (User) {
      checkUserPath()
    }
  }, [User])

  const handleStart = async () => {
    const path = await shuffle("abcd");
    const array = path.split('');
    setLoad(true)
    const washingtonRef = doc(db, "users", User.email);
    await updateDoc(washingtonRef, {
      path: array,
      startTime: new Date()
    }).then(() => {
      router.push("/scan")
    }).catch((err) => {
    })
  }
  if (User) {
    if (!load) {
      return (
        <div className=' min-h-screen primary-bg p-4 pb-0 pt-0 bg-color text-white'>
          <div className='flex flex-col items-center p-4 pt-0 rounded-lg lg:w-1/2 w-full text-sm'>
          <div className='w-full h-1/3'>
              <Image src={decor} width={0} height={0} alt='decor' style={{height:"100%",width:"100%"}}/>
            </div>
            <div className='flex flex-col items-center relative -top-10'>

            <div className='w-full flex justify-center items-center gap-1'>
              <h1 className='text-5xl text-center'>RULES</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>

            </div>
            
            <div className='text-xs '>
              <h5 className='mt-4'>• Use the QR code scanner to scan QR codes placed around the campus.
                Pay attention to the instructions or content provided when scanning QR codes.</h5>


              <h5 className='mt-4'>• Each team will have a unique set of QR code locations to visit.
                Stick to your designated pathway and don't deviate.</h5>


              <h5 className='mt-4'>• Time is of the essence. The team that completes the hunt in the shortest time wins.
                Keep an eye on the clock and strategize your moves.</h5>


              <h5 className='mt-4'>• Pay attention to each clue's details. They will guide your team to the next location.</h5>


              <h5 className='mt-4'>• Keep the answers within your team. Let other teams enjoy the challenge without spoilers.</h5>


              <h5 className='mt-4'>• Dont displace or manipulate the qr codes. They are strategically placed for a fair and challenging game.</h5>


            </div>
            </div>
            <button onClick={handleStart} className='l-button w-2/3'>Start the Hunt</button>
          </div>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

export default Instruction
