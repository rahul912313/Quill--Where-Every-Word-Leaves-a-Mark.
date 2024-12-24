import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import TrendingTopics from '../../components/TrendingTopics';
import Categories from '../../components/Categories';
import FeaturedPosts from '../../components/FeaturedPost';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        {/* <TrendingTopics /> */}
        <Categories />
        <FeaturedPosts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

