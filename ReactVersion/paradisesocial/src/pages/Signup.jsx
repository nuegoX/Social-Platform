import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, signUp} = UserAuth()
    const [errormsg, setErrormsg] = useState('note: password must be min 6 digits.')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signUp(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    };


  return (
    <>
        <div className='w-full h-screen bg-gray-800'>
        
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                        <p className='text-sm mt-2 text-gray-400'>{errormsg}</p>
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' autoComplete='email' />
                            <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' autoComplete='current-password' />
                            <button className='bg-blue-600 py-3 my-6 rounded font-bold hover:bg-blue-500'>Sign Up</button>
                            <div className='flex justify-between items-center text-sm text-gray-600'>

                            </div>
                            <p className='py-8 text-blue-600'><span className='text-white'>Already have an account?</span>
                            <Link to='/login'> Sign In</Link></p>
                            
                        </form>
                    </div>
                </div>
            </div>
    </div>
    </>
  )
}

export default Signup