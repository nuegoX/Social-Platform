import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreatePost = async () => {
    if (!auth.currentUser || !title || !description) {
      return;
    }

    try {
      const postData = {
        publisher: auth.currentUser.email,
        title,
        description,
        timestamp: serverTimestamp(), 
      };

      // Add the post to the 'posts' collection with auto-generated ID
      const docRef = await addDoc(collection(db, 'posts'), postData);

      setTitle('');
      setDescription('');

      window.location.reload();
    } catch (error) {
      console.error('Error creating post: ', error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-8 border rounded-lg shadow-xl bg-gray-700">
      <h2 className="text-3xl font-semibold mb-6 text-white text-center">Create Post</h2>
      <div className="mb-6">
        <label className="mb-2 text-white">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="w-full p-3 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-white">
          Description:
        </label>
        <textarea
          id="description"
          className="w-full p-3 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleCreatePost}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full focus:outline-none"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
