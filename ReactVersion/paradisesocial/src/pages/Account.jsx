import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc,  onSnapshot } from 'firebase/firestore';
import CreatePost from '../components/CreatePost';


const Account = () => {
  const [points, setPoints] = useState(0);
  const [name, setName] = useState("");
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setPoints(doc.data()?.colorCoins);
    });
  }, [user?.email]);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setName(doc.data()?.nickname);
    });
  }, [user?.email]);

  const changeName = async () => {
    
    if (user?.email) {
      console.log('Changing nickname to "myname"...');
      const userRef = doc(db, 'users', `${user?.email}`);
      try {
        await updateDoc(userRef, { nickname: 'myname' });
        console.log('Nickname changed successfully!');
      } catch (error) {
        console.error('Error changing nickname:', error);
      }
    }
  };
  

  return (
    <>
      <div className='w-full h-screen bg-blue-600'>
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
        <div className='fixed w-full px-4 py-24 z-50'>
            <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-bold'>My Account</h1>
                    <div className='w-full flex flex-col py-4'>
                        <p className='p-3 my-2 bg-gray-700 rounded'>Balance: {points}</p>
                        <p className='p-3 my-2 bg-gray-700 rounded'>Nickname: {name}</p>
                        <button disabled={true} onClick={changeName} className='bg-blue-600 py-3 my-6 rounded font-bold hover:bg-blue-500'>Edit Name (coming soon)</button>
                     
                        <div className='flex justify-between items-center text-sm text-gray-600'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Account