import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // You need to install react-icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-gray-400">&copy; 2023 BlogApp. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-emerald-500 transition duration-300"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-emerald-500 transition duration-300"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-emerald-500 transition duration-300"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
