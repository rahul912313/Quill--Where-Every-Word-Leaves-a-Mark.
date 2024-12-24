import React, { useState } from 'react';
import { signupSchemaType } from '@onerahul/quill-common-app';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<signupSchemaType>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white min-w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8"
      >
        <h2 className="text-3xl font-medium text-center text-gray-900 mb-8">
          Sign Up
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-900 bg-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-900 bg-transparent"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-900 bg-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-3 font-medium tracking-wide"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-gray-900 underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
