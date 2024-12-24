import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent px-10">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-3">
          <img 
            src="../images/quill-logo.jpeg"  // Replace with the actual logo path
            alt="Quill Logo"
            className="w-12 h-12 rounded-full"  // Adjust logo size as needed
          />
          <h1 className="text-2xl sm:text-3xl font-light text-white">Quill</h1>
        </div>
        
        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <a href="#featured-post" className="text-white hover:text-emerald-300 transition duration-300">Trending</a>
          <a href="/login" className="text-white hover:text-emerald-300 transition duration-300">Login</a>
          <a href="/signup" className="text-white hover:text-emerald-300 transition duration-300">Sign Up</a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white hover:text-emerald-300 transition duration-300 bg-transparent p-2 rounded">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
