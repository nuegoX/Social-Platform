import React from 'react'
import FeatureCard from '../components/FeatureCard'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import '../index.css';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
const Home = () => {

  const { user } = UserAuth()
  const navigate = useNavigate();

  return (
    <>
    <div className='h-fit w-full flex items-center flex-col'>
      
      <div className='w-full max-w-[800px] h-fit m-28 rounded flex justify-center flex-row gap-5 mt-40 sm:mt-28'>
        <h1 className='text-2xl md:text-4xl text-blue-600 font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-slow infinite'>
          Welcome, to
          </h1><p className='text-2xl md:text-4xl bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent animate-pulse-slow pulse-slow infinite'>
            Social Paradise.
            </p>
      </div>

      <div className='w-full flex items-center flex-col mb-10'>

      </div>



      {user?.email !== undefined && user.email !== '' ? 
  (<Link to='/'><button className='bg-blue-600 w-44 h-20 rounded-lg cursor-pointer text-white text-xl hover:bg-purple-400'>Enter App</button></Link>) 
  : (
  <div><Link to='/getstarted'><button className='bg-blue-600 w-28 h-11 sm:w-44 sm:h-11 rounded-lg cursor-pointer text-white sm:text-xl hover:bg-blue-500 hover:border'>Sign Up</button></Link>
  <Link to='/login'><button className='bg-pink-600 w-28 h-11 sm:w-44 sm:h-11 rounded-lg cursor-pointer text-white sm:text-xl hover:bg-pink-500 hover:border'>Log In</button></Link></div>)}

    </div>
    </>
  )
}

export default Home