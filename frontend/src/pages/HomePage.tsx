import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';

interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8787/api/v1/posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-12 text-center">
          Discover Stories & Insights
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.description}
                author={post.author}
                date={post.createdAt}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
