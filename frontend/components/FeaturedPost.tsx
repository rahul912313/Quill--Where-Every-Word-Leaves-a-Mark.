import React from 'react';

const FeaturedPosts: React.FC = () => {
  return (
    <section id="featured" className="py-20 bg-gray-50 px-10">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl sm:text-4xl font-light text-center mb-12 text-gray-800">Featured Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3].map((post) => (
            <article key={post} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200">
              <img 
                src={`https://source.unsplash.com/random/400x300?sig=${post}`}
                alt={`Featured post ${post}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Captivating Blog Post Title {post}</h4>
                <p className="text-gray-600 mb-4">Dive into a world of fascinating ideas and unique perspectives that will broaden your horizons and spark your curiosity.</p>
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">Read Full Article →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
