'use client'
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import wrap from '../../public/images/wrap.svg'
import Image from 'next/image'

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        router.push("/instruction")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Login Failed, Try Again !!");
      });

  }
  return (
    <div className='h-screen primary-bg bg-color items-center'>
       <div className='w-full h-auto'>
                    <Image src={wrap} width={0} height={0} alt='trophy' style={{ height: "100%", width: "100%" }} />
        </div>
      <div className='p-8 flex flex-col items-center rounded-md text-white'>
        <h1 className='mb-2 text-5xl font-serif font-bold'>Login</h1>
        <input value={email} className='input' autoComplete='off' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
        <input value={password} className='input' autoComplete='off' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
        <div className="flex w-full justify-between text-xs mt-4">
          <div className='flex'>
            <input type="checkbox" className='bg-orange-950' />
            <span className='ml-1'>remember me</span>
          </div>
          <Link href="/signup" className='cursor-pointer ml-8'>Create new Account?</Link>
        </div>
        <button onClick={handleSubmit} className='l-button rounded-3xl w-1/2 mt-4'>LOGIN</button>
      </div>
    </div>
  )
}
