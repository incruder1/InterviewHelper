"use client";
import { useState } from "react";
import { FAQS } from "@/constants/landing";
import SectionDivider from "@/components/common/SectionDivider";
import SectionHeader from "@/components/common/SectionHeader";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-32 bg-[#080808] relative">
      <SectionDivider />

      <div className="max-w-2xl mx-auto px-6">
        <SectionHeader tag="FAQ" title="Common questions" subtitle="Everything you need to know about InterviewHelper" />

        <div className="space-y-2">
          {FAQS.map((item, index) => (
            <div key={index} className="border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-colors duration-200">
              <button
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-sm font-medium text-white">{item.question}</span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === index ? "rotate-45 border-violet-500 bg-violet-600/20" : "border-zinc-700 bg-zinc-900"}`}>
                  <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 border-t border-zinc-800/50">
                  <p className="text-zinc-400 text-sm leading-relaxed pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
