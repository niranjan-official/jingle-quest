'use client'
import React from 'react'
import Image from 'next/image'
import trophy from '../../public/images/santa.svg'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation'

const Complete = () => {

  const router = useRouter();
  // const { width, height } = useWindowSize()
  return (
    <div className='h-screen primary-bg text-white p-3 text-center bg-color justify-center items-center'>
      <div className='w-full h-2/5 p-2'>
        <Image src={trophy} width={0} height={0} alt='trophy' style={{ height: "100%", width: "100%"}} />
      </div>
      <Confetti
      width={340}
      height={350}
    />
      <h1 className='font-semibold text-4xl'>Congratulations !!!</h1>
      <h2 className='text-2xl mt-3'>You have completed the game, kindly wait for the result to be published.</h2>
      <button onClick={()=>router.push('/')} className='l-button mt-7'>Return to Home page</button>
    </div>
  )
}


export default Complete