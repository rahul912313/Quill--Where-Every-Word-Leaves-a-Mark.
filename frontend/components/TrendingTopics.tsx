import React from 'react';

const topics = [
  { title: 'Technology', image: 'https://source.unsplash.com/random/300x200?technology' },
  { title: 'Travel', image: 'https://source.unsplash.com/random/300x200?travel' },
  { title: 'Food', image: 'https://source.unsplash.com/random/300x200?food' },
  { title: 'Lifestyle', image: 'https://source.unsplash.com/random/300x200?lifestyle' },
  { title: 'Health', image: 'https://source.unsplash.com/random/300x200?health' },
  { title: 'Culture', image: 'https://source.unsplash.com/random/300x200?culture' }
];

const TrendingTopics: React.FC = () => {
  return (
    <section id="trending" className="py-20 bg-gray-50 px-8">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl sm:text-4xl font-light text-center mb-12 text-gray-800">Trending Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 overflow-hidden">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2 text-gray-800">{topic.title}</h4>
                <p className="text-gray-600">Explore the latest trends and insights in {topic.title.toLowerCase()}.</p>
                <a href="#" className="mt-4 inline-block text-emerald-600 hover:text-emerald-700 font-semibold">Read more →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTopics;
