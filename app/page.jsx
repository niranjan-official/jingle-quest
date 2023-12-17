'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import treasureBox from "../public/images/login.svg"
const Home = () => {
    return (
        <div className='w-screen h-screen bg-color'>
            <div className='w-full h-1/2 pb-5'>
                <Image src={treasureBox} height={0} width={0} style={{ width: '100%', height: '100%' }} />
            </div>
            <div className='w-full h-1/2 flex flex-col p-3 pt-0'>
                <div className='relative -top-12'>
                    <div className='flex flex-col items-center text-white'>
                        <h1 className='text-6xl font-serif text-center mt-3'>JINGLE</h1>
                        <h1 className='text-4xl font-serif text-center mt-2 mb-2'>QUEST</h1>
                        <h2>“ Christmas joy in every clue,  a festive </h2>
                        <h2 className='mb-6'>reasure hunt just for you “</h2>
                    </div>
                    <div className='flex flex-col pl-6 pr-6'>
                        <Link href="/login">
                            <button className='w-full rounded-3xl l-button shadow-md'>LOGIN</button>
                        </Link>
                        <div className='flex items-center text-white pl-4 pr-4'>
                            <hr className='w-full border-1 border-white' />
                            <span className='m-3 mt-6 mb-6 text-xl'>or</span>
                            <hr className='w-full border-1 border-white' />
                        </div>
                        <Link href="/signup">
                            <button className='w-full rounded-3xl shadow-md l-button'>SIGN UP</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home