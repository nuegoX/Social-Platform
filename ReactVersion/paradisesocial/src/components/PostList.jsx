import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, where, query, addDoc, serverTimestamp } from 'firebase/firestore';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);

      const postsData = [];
      const commentInputsData = {};
      const expandedCommentsData = {};

      for (const doc of postsSnapshot.docs) {
        const post = { id: doc.id, ...doc.data() };

        // Fetch comments for each post
        const commentsQuery = query(collection(db, 'comments'), where('postId', '==', post.id));
        const commentsSnapshot = await getDocs(commentsQuery);
        const comments = commentsSnapshot.docs.map(commentDoc => ({ id: commentDoc.id, ...commentDoc.data() }));

        post.comments = comments;
        postsData.push(post);
        commentInputsData[post.id] = ''; // Initialize the comment input for each post
        expandedCommentsData[post.id] = false; // Initialize comment section as collapsed
      }

      setPosts(postsData);
      setCommentInputs(commentInputsData);
      setExpandedComments(expandedCommentsData);
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
      // Clear the comment input after submission
      setCommentInputs((prevInputs) => ({
        ...prevInputs,
        [postId]: '',
      }));
      // Refresh the page after adding a comment
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment: ', error.message);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments((prevExpanded) => ({
      ...prevExpanded,
      [postId]: !prevExpanded[postId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-gradient-to-r from-blue-900 via-gray-500 to-green-700 p-8 rounded-md shadow-lg mb-8">
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
          <p className="text-white text-lg mb-4">{post.title}</p>
          <div className="border-t border-gray-300 pt-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full p-2 bg-transparent border-b border-gray-300 text-white focus:outline-none"
                value={commentInputs[post.id]}
                onChange={(e) => setCommentInputs((prevInputs) => ({ ...prevInputs, [post.id]: e.target.value }))}
              />
              <button
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none"
                onClick={() => handleAddComment(post.id)}
              >
                Add Comment
              </button>
            </div>
            {expandedComments[post.id] && post.comments && post.comments.map((comment) => (
              <div key={comment.id} className="flex items-center mb-2">
                <img
                  src="https://pics.craiyon.com/2023-06-20/129dd0069b1e45cf884960838546f06a.webp"
                  alt="Commenter Avatar"
                  className="w-6 h-6 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-white font-semibold">{comment.publisher}</p>
                  <p className="text-gray-300 text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
            <button
              className="text-white text-sm cursor-pointer"
              onClick={() => toggleComments(post.id)}
            >
              {expandedComments[post.id] ? 'Hide Comments' : 'View Comments'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
