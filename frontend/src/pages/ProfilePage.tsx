import React from 'react';
import Layout from '../../components/Layout';

const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full text-center">
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full mb-6 border-4 border-gray-200"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">John Doe</h1>
            <p className="text-gray-500 mt-2">john.doe@example.com</p>
          </div>

          {/* Edit Button */}
          <div className="flex justify-center mb-8">
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              Edit Profile
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700">Member Since</span>
              <span className="text-gray-900 font-medium">January 1, 2023</span>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bio</h3>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
