import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const AddPostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting post:', { title, content });

    // Retrieve token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      // Prepare request headers with Authorization token
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      // Prepare request body with the form data
      const body = JSON.stringify({
        title,
        description: content, // Assuming `description` maps to the post content
      });

      // Send the POST request to the backend
      const response = await fetch('https://backend.rahulptl556.workers.dev/api/v1/posts/post', {
        method: 'POST',
        headers,
        body,
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        console.log('Post successfully submitted:', data);
        navigate('/home'); // Redirect to homepage after successful post submission
      } else {
        const errorData = await response.json();
        console.error('Error submitting post:', errorData);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-16 px-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full text-4xl font-semibold leading-tight focus:outline-none bg-transparent border-b border-gray-300 placeholder-gray-500"
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Write your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              className="w-full resize-none text-lg leading-relaxed focus:outline-none bg-transparent border-b border-gray-300 placeholder-gray-500"
            ></textarea>
          </div>
          <div className="flex justify-between items-center mt-6 space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white text-lg font-medium rounded-md hover:bg-gray-800 transition duration-300"
            >
              Publish
            </button>
            <div className="relative group">
              <button
                type="button"
                className="px-6 py-3 bg-gray-300 text-gray-900 text-lg font-medium rounded-md hover:bg-gray-400 transition duration-300"
              >
                Fix with AI
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-4 py-2 text-sm bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Polish your text with AI magic.
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddPostPage;
