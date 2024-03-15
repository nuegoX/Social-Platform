import React from 'react'
import CreatePost from '../components/CreatePost'
import PostList from '../components/PostList'

const Dashboard = () => {
  return (
    <>

    <div className='pt-[50px]'>
      <CreatePost />
      <PostList />
    </div>

    </>
  )
}

export default Dashboard