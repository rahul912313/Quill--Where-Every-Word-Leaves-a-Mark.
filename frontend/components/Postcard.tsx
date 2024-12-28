import React from 'react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, excerpt, author, date }) => {
  // Limit the excerpt to 150 characters
  const maxExcerptLength = 150;
  const shortenedExcerpt = excerpt.length > maxExcerptLength ? excerpt.slice(0, maxExcerptLength) + '...' : excerpt;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-semibold leading-tight mb-3">
          <Link to={`/post/${id}`} className="text-gray-900 hover:text-emerald-500 transition-colors duration-300">
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 text-md mb-4 leading-relaxed">{shortenedExcerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span className="font-medium">{author}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
