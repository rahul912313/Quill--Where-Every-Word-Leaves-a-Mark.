import React from 'react';
import { useSpring, animated, config } from 'react-spring';

const Hero: React.FC = () => {
  const fadeIn = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: config.molasses,
  });

  return (
    <animated.section style={fadeIn} className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://unsplash.com/photos/a-computer-keyboard-sitting-on-top-of-a-wooden-desk-Wyc7vHXfCDQ')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-6 text-center relative z-10 text-white">
        <h2 className="text-4xl sm:text-5xl font-light mb-6 text-gray-100 leading-tight">
          Discover, Create, Inspire
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          Join our vibrant community of writers and readers. Explore new ideas, share your unique perspective, and connect with passionate individuals from around the world.
        </p>
        <a href="/signup" className="bg-transparent border-2 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition duration-300 text-lg hover:border-0">
          Start Your Journey
        </a>
      </div>
    </animated.section>
  );
};

export default Hero;
