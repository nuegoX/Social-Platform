import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import { db, auth } from '../firebase';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  return (
    <>
      <div className='w-full h-20'></div>
      <div className='flex w-full mt-5 justify-center items-center'>
        <div className='w-[80%] bg-blue-500 mt-10 h-20 rounded-lg border-2 flex flex-col justify-center items-center'>
          <p className='text-white text-2xl'>Welcome to your dashboard</p>
          
        </div>
      </div>
      <div className='pt-[50px]'>
        <CreatePost />
        <PostList />
      </div>
    </>
  );
};

export default Dashboard;
