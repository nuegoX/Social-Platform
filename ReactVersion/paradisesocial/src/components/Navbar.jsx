import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import '../index.css';

const Navbar = () => {
  const { user, logOut } = UserAuth()
  const navigate = useNavigate();
  const [ colorlink, setColorlink ] = useState('/')

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>

      <div className='flex flex-row'>
      <Link to='/'>
        <h1 className='text-blue-600 text-4xl font-bold cursor-pointer hover:text-purple-400 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-slow infinite'>Social Paradise</h1>
      </Link>
      </div>

     
      

      {user?.email ? (
      <div>

        <Link to='/'>
          <button className='text-white pr-4 hover:text-blue-200'>Dashboard</button>
        </Link>

        <button onClick={handleLogout} className='bg-blue-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-purple-400'>Log Out</button>

      </div> 
      ):( 
      <div>

        <Link to='/login'>
          <button className='text-white pr-4 hover:text-blue-200'>Sign In</button>
        </Link>

        <Link to='/getstarted'>
          <button className='bg-blue-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-purple-400'>Get Started</button>
        </Link>

      </div>)}
    </div>
  )
}

export default Navbar