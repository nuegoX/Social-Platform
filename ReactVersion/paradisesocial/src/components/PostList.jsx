import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);

      const postsData = [];
      for (const doc of postsSnapshot.docs) {
        const post = { id: doc.id, ...doc.data() };

        // Fetch comments for each post
        const commentsQuery = query(collection(db, 'comments'), where('postId', '==', post.id));
        const commentsSnapshot = await getDocs(commentsQuery);
        const comments = commentsSnapshot.docs.map(commentDoc => ({ id: commentDoc.id, ...commentDoc.data() }));

        post.comments = comments;
        postsData.push(post);
      }

      setPosts(postsData);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-gray-900 text-white p-4 rounded">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-800 rounded shadow-lg p-8 mb-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-500">{post.title}</h2>
            <p className="text-gray-400">By: {post.publisher}</p>
          </div>
          <p className="text-gray-300 mb-6">{post.description}</p>

          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-500">Comments:</h3>
            {post.comments && post.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-700 p-4 rounded mb-4">
                <p className="text-gray-300">{comment.text}</p>
                <p className="text-gray-400 text-sm">By: {comment.publisher}</p>
              </div>
            ))}
          </div>

          <hr className="my-6 border-gray-600" />
        </div>
      ))}
    </div>
  );
};

export default PostList;

