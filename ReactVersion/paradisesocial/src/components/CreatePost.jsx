import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreatePost = async () => {
    if (!auth.currentUser || !title || !description) {
      // Handle case when the user is not logged in or post fields are empty
      return;
    }

    try {
      const postData = {
        publisher: auth.currentUser.displayName || auth.currentUser.email,
        title,
        description,
        timestamp: serverTimestamp(), // Use server timestamp
      };

      // Add the post to the 'posts' collection with auto-generated ID
      const docRef = await addDoc(collection(db, 'posts'), postData);

      // Optionally, you can count the comments for this post
      const commentsQuery = query(collection(db, 'comments'), where('postId', '==', docRef.id));
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentCount = commentsSnapshot.size;

      // Update the post with the comment count
      await docRef.update({ commentCount });

      // Clear the input fields
      setTitle('');
      setDescription('');

      // Refresh the page after creating a post
      window.location.reload();
    } catch (error) {
      console.error('Error creating post: ', error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-gradient-to-br from-blue-500 to-gray-600 text-white rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-semibold mb-6">✨</h2>
      <div className="mb-6">
        <label className="block text-navy-blue-300 text-sm font-bold mb-2" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:border-pink-500 font-bold text-lg text-blue-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-navy-blue-300 text-sm font-bold mb-2" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:border-pink-500 text-blue-900 text-lg"
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
