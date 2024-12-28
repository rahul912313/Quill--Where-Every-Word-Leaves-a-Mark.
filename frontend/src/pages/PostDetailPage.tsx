import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  description: string; // Full content of the post
  author: string;
  createdAt: string;
  excerpt: string; // Short preview of the content
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [summarizedContent, setSummarizedContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://127.0.0.1:8787/api/v1/posts/${id}`, {
          method: 'GET',
          headers,
        });

        const data = await response.json();

        if (data.post) {
          setPost(data.post); // Store the response data in state
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPost();
  }, [id]);

  const formatDescription = (description: string) => {
    // Split content into paragraphs based on newline characters
    const paragraphs = description.split('\n').map((para, index) => {
      return <p key={index} className="mt-4 text-lg text-gray-800 leading-relaxed">{para}</p>;
    });
    return paragraphs;
  };

  const summarizePost = async () => {
    if (!post?.description) return;
  
    // Get the token from local storage, state, or wherever it's stored
    const token = localStorage.getItem('authToken'); // Example: Replace with your token source
  
    // If the token is missing, show an error
    if (!token) {
      console.error('Authentication token is missing');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8787/api/v1/posts/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in the header
        },
        body: JSON.stringify({ description: post.description }),
      });
  
      const data = await response.json();
      console.log('Summary:', data);
      if (data.summary) {
        setSummarizedContent(data.summary); // Store the summarized content in state
      } else {
        console.error('Error: No summary returned');
      }
    } catch (error) {
      console.error('Error summarizing post:', error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white shadow-xl rounded-lg p-8">
        {/* Post Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">{post.title}</h1>

        {/* Author and Date */}
        <div className="mt-4 text-xl text-gray-600">
          <span className="font-medium">{post.author}</span> - 
          <span className="ml-2 text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Excerpt (Preview) */}
        <p className="mt-6 text-2xl text-gray-700">{post.excerpt}</p>

        {/* Full Content (Formatted) */}
        <div className="mt-8 text-gray-800 text-xl leading-relaxed">
          {formatDescription(post.description)}
        </div>

        {/* Summarize Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={summarizePost}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Summarize using AI
          </button>
        </div>

        {/* Display Summary */}
        {summarizedContent && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900">Summary:</h2>
            <p className="mt-4 text-lg text-gray-800">{summarizedContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
