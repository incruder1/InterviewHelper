import React from 'react';

import { FaBeer } from 'react-icons/fa';
import { IoIosChatbubbles } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { IoIosBook } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";



const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-neutral-900">
      <FaBeer />
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
            Powerful Features to Ace Your Interviews
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Our AI-powered platform provides everything you need to prepare for your next interview
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature Items */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-primary-500 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center mb-4">
              {/* <IoChatbubbles />
                <i className={`fas ${feature.icon} text-blue-400 text-2xl`}></i>  */}

                {feature.icon}
                   
                 
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full text-lg transition-colors">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: <IoIosChatbubbles  size={30} color='#1d4ed8' />, // Directly use the icon component
    title: 'Real-time Feedback',
    description:
      'Get instant feedback on your answers, body language, and speaking pace to improve your performance.',
  },
  {
    icon: <MdDashboardCustomize  size={30} color='#1d4ed8'  />,
    title: 'Custom Scenarios',
    description:
      'Practice with industry-specific questions and scenarios tailored to your target role.',
  },
  {
    icon: <GiProgression size={30} color="#1d4ed8" />,
    title: 'Progress Tracking',
    description:
      'Monitor your improvement over time with detailed performance analytics and insights.',
  },
  {
    icon: <FaRobot size={30} color="#1d4ed8" />,
    title: 'AI Interview Coach',
    description:
      'Get personalized coaching and tips from our advanced AI powered by Google Gemini.',
  },
  {
    icon: <RiCheckboxMultipleLine  size={30} color="#1d4ed8" />,
    title: 'Multiple Formats',
    description:
      'Practice various interview formats including behavioral, technical, and case interviews.',
  },
  {
    icon: <IoIosBook  size={30} color="#1d4ed8" />,
    title: 'Answer Library',
    description:
      'Access a comprehensive library of sample answers and best practices for common questions.',
  },
];
export default FeaturesSection;
