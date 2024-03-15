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
    <div className='h-fit w-full flex items-center flex-col'>
      
      <div className='w-full max-w-[800px] h-fit m-28 rounded flex justify-center flex-row gap-5'>
        <h1 className='text-2xl md:text-4xl text-blue-600 font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-slow infinite'>
          Welcome, to
          </h1><p className='text-2xl md:text-4xl bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent animate-pulse-slow pulse-slow infinite'>
            Social Paradise.
            </p>
      </div>

      <div className='w-full flex items-center flex-col mb-10'>
        <div className=' w-[700px] h-[700px] rounded-md border-4 bg-purple-950 flex flex-col items-center'>
          <p className='text-yellow-600 text-center mt-10 text-4xl underline'>Test text</p>
          <p className='text-white text-center text-2xl'>Test text</p>
          <div className='w-fit h-20 bg-gray-200 hover:bg-gray-400 border-4 border-blue-400 hover:border-blue-500 rounded-md mt-10 flex justify-center items-center p-5'>
            Create posts.
          </div>
          <div className='w-fit h-20 bg-gray-200 hover:bg-gray-400 border-4 border-blue-400 hover:border-blue-500 rounded-md mt-10 flex justify-center items-center p-5'>
            Engage in discussions.
          </div>
        </div>
      </div>



      {user?.email !== undefined && user.email !== '' ? 
  (<Link to='/chat'><button className='bg-blue-600 w-44 h-11 rounded-lg cursor-pointer text-white text-xl hover:bg-purple-400'>Enter Social Paradise</button></Link>) 
  : (<Link to='/getstarted'><button className='bg-blue-600 w-44 h-11 rounded-lg cursor-pointer text-white text-xl hover:bg-blue-500'>Sign Up</button></Link>)}

    </div>
    </>
  )
}

export default Home