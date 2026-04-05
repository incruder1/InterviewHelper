"use client";
import { HOW_IT_WORKS_STEPS } from "@/constants/dashboard";

const ICONS = [
  // settings/prepare
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>,
  // mic/start
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  // feedback/chart
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
];

const COLORS = [
  { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.3)", icon: "#a78bfa", num: "#7c3aed" },
  { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", icon: "#60a5fa", num: "#3b82f6" },
  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", icon: "#34d399", num: "#10b981" },
];

const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
          style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}>
          Getting Started
        </span>
        <h1 className="text-3xl font-bold text-white mb-3">How It Works</h1>
        <p className="text-[#6b6b8a] text-sm max-w-md mx-auto">
          Three simple steps to simulate, practice, and ace your next interview.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* connector line */}
        <div className="absolute left-[39px] top-16 bottom-16 w-px hidden md:block"
          style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.4), rgba(16,185,129,0.4))" }} />

        <div className="flex flex-col gap-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const c = COLORS[index];
            return (
              <div key={index} className="flex gap-6 items-start group">
                {/* Icon circle */}
                <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <span style={{ color: c.icon }}>{ICONS[index]}</span>
                  <span className="text-xs font-bold" style={{ color: c.num }}>0{index + 1}</span>
                </div>

                {/* Content */}
                <div className="flex-1 rounded-2xl px-6 py-5 transition-all duration-300 group-hover:translate-x-1"
                  style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-[#8b8ba8] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 rounded-2xl px-8 py-8 text-center"
        style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))", border: "1px solid rgba(124,58,237,0.2)" }}>
        <h2 className="text-white font-semibold text-lg mb-2">Ready to get started?</h2>
        <p className="text-[#6b6b8a] text-sm mb-6">Create your first AI mock interview in under a minute.</p>
        <a href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 20px rgba(124,58,237,0.35)" }}>
          Go to Dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;
