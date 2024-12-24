import React from 'react';

const QuoteCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
      <div className="text-center px-10">
        <h1 className="text-4xl font-light leading-relaxed text-gray-800">
          “The only way to do great work is to love what you do.”
        </h1>
        <p className="text-lg text-gray-600 mt-4">- Steve Jobs</p>
      </div>
    </div>
  );
};

export default QuoteCard;
