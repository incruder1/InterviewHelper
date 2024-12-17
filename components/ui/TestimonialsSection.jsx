import React from 'react';
import { IoStar } from "react-icons/io5";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
            Success Stories from Our Users
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            See how Interview Helper has helped candidates land their dream jobs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
              <div className="flex items-center mb-6">
                <img src={testimonial.avatar} alt="User Avatar" className="w-14 h-14 rounded-full" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-primary-400">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    // <i key={starIndex} className="fas fa-star"></i>
                    <IoStar key={starIndex} className='' color="#FFD700" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-neutral-300">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-neutral-800 border border-neutral-700">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-neutral-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <button className="bg-blue-500 hover:bg-primary-700 text-white px-8 py-3 rounded-full text-lg transition-colors">
            Join Our Success Stories
          </button>
        </div> */}
      </div>
    </section>
  );
};

const testimonials = [
  {
    avatar: "https://avatar.iran.liara.run/public/2",
    name: "John Doe",
    role: "Software Engineer at Google",
    rating: 5,
    feedback:
      "Interview Helper transformed my interview preparation. The AI feedback helped me identify and improve my weak points. I landed my dream job at Google!",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/4",
    name: "Michael Chen",
    role: "Product Manager at Amazon",
    rating: 3,
    feedback:
      "The industry-specific questions and real-time feedback were game-changers. I felt much more confident during my actual interviews.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/1",
    name: "Emily Roberts",
    role: "Data Scientist at Microsoft",
    rating: 4,
    feedback:
      "The technical interview practice was incredibly helpful. The AI's ability to adapt to my skill level made the learning process very effective.",
  },
];

const stats = [
  { value: "95%", label: "Success Rate" },
  { value: "50,000+", label: "Interviews Conducted" },
  { value: "1,000+", label: "Companies Hiring" },
];

export default TestimonialsSection;
