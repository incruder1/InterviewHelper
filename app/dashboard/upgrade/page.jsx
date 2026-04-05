"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { PRICING_PLANS, PLAN_FEATURES } from "@/constants/dashboard";
import GlowButton from "@/components/common/GlowButton";

const Upgrade = () => {
  const { user } = useUser();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1 mb-4">
          Testing Mode
        </span>
        <h1 className="text-2xl font-bold text-white">Choose your plan</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PRICING_PLANS.map((plan, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 sm:p-8 flex flex-col"
            style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="text-center mb-6">
              <h2 className="text-white font-medium mb-2">{plan.duration}</h2>
              <p>
                <span className="text-3xl sm:text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-sm text-[#6b6b8a] ml-1">/ {plan.duration.toLowerCase()}</span>
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {PLAN_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-[#a0a0c0]">
                  <svg className="w-4 h-4 text-violet-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={`${plan.link}?prefilled_email=${user?.primaryEmailAddress?.emailAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlowButton className="w-full h-10">Get Started</GlowButton>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
