import React from 'react';

const categories = ['Science', 'Art', 'Business', 'Politics', 'Sports', 'Music', 'Fashion', 'Education'];

const Categories: React.FC = () => {
  return (
    <section id="categories" className="py-20 bg-gray-50 px-10">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-light text-center mb-12 text-gray-800">
          Explore Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="bg-white text-gray-800 rounded-full px-6 py-3 text-center shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
