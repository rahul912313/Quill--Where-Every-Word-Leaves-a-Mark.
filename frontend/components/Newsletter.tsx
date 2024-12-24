import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signed up with email:', email);
    setEmail('');
  };

  return (
    <section id="signup" className="bg-gray-50 py-20 flex items-center justify-center">
      <div className="text-center px-8 py-12 max-w-2xl mx-auto">
        <h3 className="text-3xl sm:text-4xl font-light text-gray-800 mb-6">
          Join Our Community
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Be part of a thriving ecosystem of writers and readers. Get weekly digests of the best content, tailored to your interests.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-3 rounded-l-lg sm:rounded-r-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-r-lg sm:rounded-l-none hover:bg-emerald-700 transition duration-300"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
