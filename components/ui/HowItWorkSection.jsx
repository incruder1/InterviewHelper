import React from 'react';

const HowItWorksSection = () => {
  return (
    <section id="how_it_works" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
            How Interview Helper Works
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Get started with your interview preparation in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 == 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="rounded-xl w-full"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
                  <div className="inline-block bg-blue-900 rounded-lg px-4 py-2 mb-4">
                    <span className="text-blue-300 font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-neutral-300 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-center text-neutral-300">
                        <i className="fas fa-check text-primary-400 mr-3"></i>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a href='/dashboard'>
          <button className="bg-blue-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full text-lg transition-colors">
            Start Your First Interview
          </button>
          </a>
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    step: 'Step 1',
    title: 'Choose Your Interview Type',
    description:
      'Select from various interview types including technical, behavioral, or industry-specific scenarios. Our AI adapts the questions based on your experience level and target role.',
    points: [
      'Multiple interview formats',
      'Customized difficulty levels',
      'Industry-specific questions',
    ],
    image: 'https://placehold.co/600x400/1a1a1a/666666?text=Choose+Interview+Type',
    alt: 'Choose Interview Type',
  },
  {
    step: 'Step 2',
    title: 'Practice with AI',
    description:
      'Engage in realistic interview conversations with our Google Gemini AI. Get real-time feedback on your responses, body language, and speaking patterns.',
    points: [
      'Natural conversation flow',
      'Instant feedback',
      'Performance analysis',
    ],
    image: 'https://placehold.co/600x400/1a1a1a/666666?text=Practice+Interview',
    alt: 'Practice Interview',
  },
  {
    step: 'Step 3',
    title: 'Review and Improve',
    description:
      'Get detailed insights and personalized recommendations to improve your interview performance. Track your progress over time.',
    points: [
      'Detailed performance metrics',
      'Improvement suggestions',
      'Progress tracking',
    ],
    image: 'https://placehold.co/600x400/1a1a1a/666666?text=Review+and+Improve',
    alt: 'Review and Improve',
  },
];

export default HowItWorksSection;
