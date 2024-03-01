import React from 'react'
import FeatureCard from '../components/FeatureCard'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import '../index.css';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
//rafce
const Home = () => {

  const { user } = UserAuth()
  const navigate = useNavigate();

  return (
    <>
    <div className='h-[400px] w-full flex items-center flex-col'>
      
      <div className='w-full max-w-[800px] h-fit m-28 rounded flex justify-center flex-row gap-5'>
        <h1 className='text-2xl md:text-4xl text-blue-600 font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-slow infinite'>Social Paradise.</h1><p className='text-2xl md:text-4xl bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent animate-pulse-slow pulse-slow infinite'> made by Hugo Wikström.</p>
      </div>

      <div className='mb-20 p-2 w-[97%] max-w-[800px] border-solid border-0 border-pink-600 h-[900px] m-18 rounded-lg flex justify-between flex-row gap-1'>
        <FeatureCard feature='test'></FeatureCard>
        <FeatureCard feature='test'></FeatureCard>
        <FeatureCard feature='test'></FeatureCard>
      </div>
      {user?.email !== undefined && user.email !== '' ? 
  (<Link to='/chat'><button className='bg-blue-600 w-44 h-11 rounded-lg cursor-pointer text-white text-xl hover:bg-purple-400'>Enter Social Paradise</button></Link>) 
  : (<Link to='/getstarted'><button className='bg-blue-600 w-44 h-11 rounded-lg cursor-pointer text-white text-xl hover:bg-blue-500'>Sign Up</button></Link>)}

    </div>
    </>
  )
}

export default Home