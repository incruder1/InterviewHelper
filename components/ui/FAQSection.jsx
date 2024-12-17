import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const FAQSection = () => {
  const [faqItems, setFaqItems] = useState([
    {
      question: 'How does the AI interview practice work?',
      answer:
        'Our AI system powered by Google Gemini conducts realistic interview simulations. It adapts to your responses, provides real-time feedback, and helps you improve your interview skills through personalized coaching.',
      open: false,
    },
    {
      question: 'What types of interviews can I practice?',
      answer:
        'We offer various interview types including technical, behavioral, HR, case interviews, and industry-specific scenarios. Each type is customized to your experience level and target role.',
      open: false,
    },
    {
      question: 'Is my practice data secure?',
      answer:
        'Yes, we take data security seriously. All your practice sessions and personal information are encrypted and stored securely. We never share your data with third parties without your explicit consent.',
      open: false,
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No hidden fees or cancellation charges.',
      open: false,
    },
    {
      question: 'Do you offer interview questions for specific companies?',
      answer:
        'Yes, our Pro and Enterprise plans include company-specific interview questions and scenarios based on real interview experiences and industry research.',
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    const updatedFAQItems = [...faqItems];
    updatedFAQItems[index].open = !updatedFAQItems[index].open;
    setFaqItems(updatedFAQItems);
  };
  // console.log(faqItems);

  return (
    <section id="faq" className="py-24 bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Find answers to common questions about Interview Helper
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-neutral-700 rounded-xl bg-neutral-800 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <span className={`text-primary-400 transition-transform duration-300 ${item.open ? 'rotate-180' : ''}`}>
                  {item.open ? <IoIosArrowUp color='white' size={20} /> : <IoIosArrowDown color='white' size={20} />}
                </span>
              </button>
              {item.open && (
                <div className="border-t border-neutral-700 p-6">
                  <p className="text-neutral-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Support */}
        <div className="mt-16 text-center">
          <p className="text-neutral-300 mb-6">Still have questions? We're here to help!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-900 text-white px-8 py-3 rounded-full text-lg transition-colors">
              Contact Support
            </button>
            <button className="border border-neutral-700 text-white hover:bg-neutral-800 px-8 py-3 rounded-full text-lg transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
