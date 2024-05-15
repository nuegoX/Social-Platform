import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);

      const postsData = [];
      const commentInputsData = {};

      for (const doc of postsSnapshot.docs) {
        const post = { id: doc.id, ...doc.data() };

        // Fetch comments for each post
        const commentsQuery = query(collection(db, 'comments'), where('postId', '==', post.id));
        const commentsSnapshot = await getDocs(commentsQuery);
        const comments = commentsSnapshot.docs.map(commentDoc => ({ id: commentDoc.id, ...commentDoc.data() }));

        post.comments = comments;
        postsData.push(post);
        commentInputsData[post.id] = '';
      }

      setPosts(postsData);
      setCommentInputs(commentInputsData);
    };

    fetchData();
  }, []);

  const handleAddComment = async (postId) => {
    const newComment = commentInputs[postId].trim();

    if (!auth.currentUser || !newComment) {
      return;
    }

    const commentData = {
      postId,
      publisher: auth.currentUser.displayName || auth.currentUser.email,
      text: newComment,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'comments'), commentData);
      setCommentInputs((prevInputs) => ({
        ...prevInputs,
        [postId]: '',
      }));
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment: ', error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-800 p-6 rounded-md shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-white font-semibold">{post.publisher}</p>
                <p className="text-xs text-gray-300">{new Date(post.timestamp?.seconds * 1000).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <p className="text-white text-lg mb-2">{post.title}</p>
          <p className="text-gray-400 mb-4">{post.description}</p>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full p-2 bg-gray-900 border-b border-gray-700 text-white focus:outline-none"
                value={commentInputs[post.id]}
                onChange={(e) => setCommentInputs((prevInputs) => ({ ...prevInputs, [post.id]: e.target.value }))}
              />
              <button
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleAddComment(post.id)}
              >
                Comment
              </button>
            </div>
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-center mb-2">
                <img
                  src="https://via.placeholder.com/24"
                  alt="Commenter Avatar"
                  className="w-6 h-6 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-white font-semibold">{comment.publisher}</p>
                  <p className="text-gray-300 text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
