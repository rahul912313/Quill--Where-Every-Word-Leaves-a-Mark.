import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-5">
          {/* Logo / Brand */}
          <Link to="/home" className="text-3xl font-extrabold tracking-tight text-gray-900">
            Quill<span className="text-emerald-500">.</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/add-post"
              className="text-lg font-medium text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Write
            </Link>

            {/* Profile Icon */}
            <Link
              to="/profile"
              className="text-gray-500 hover:text-emerald-500 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
