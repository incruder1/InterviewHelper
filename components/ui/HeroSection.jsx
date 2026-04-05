"use client";
import { useState } from "react";
import Link from "next/link";
import { SITE_NAME, NAV_LINKS, DEMO_VIDEO_URL } from "@/constants/site";
import { HERO_BADGE, HERO_STATS } from "@/constants/landing";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#080808] overflow-hidden flex flex-col">
      {/* Grid + glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-700/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-700/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-700/10 rounded-full blur-[80px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 max-w-7xl mx-auto w-full px-6 py-6">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white tracking-tight">{SITE_NAME}</span>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                {label}
              </Link>
            ))}
            <Link href="/dashboard" className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-5 py-2 rounded-lg transition-all duration-200 font-medium shadow-[0_0_20px_-5px_rgba(124,58,237,0.6)]">
              Get Started
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-zinc-400 hover:text-white transition-colors">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white text-sm py-2.5 px-3 rounded-lg hover:bg-zinc-800 transition-colors">
                  {label}
                </Link>
              ))}
              <Link href="/dashboard" className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-lg text-center transition-all font-medium mt-2">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-10 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-violet-300 text-sm font-medium">{HERO_BADGE}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Ace every interview{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice with a real AI interviewer, get instant personalised feedback, and walk into your next interview with total confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="group bg-violet-600 hover:bg-violet-500 text-white px-8 py-3.5 rounded-xl text-base font-medium transition-all duration-200 shadow-[0_0_40px_-10px_rgba(124,58,237,0.8)] hover:shadow-[0_0_50px_-8px_rgba(124,58,237,1)]">
                Start Practicing Free
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </Link>
            <a href={DEMO_VIDEO_URL} target="_blank" rel="noopener noreferrer">
              <button className="flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white px-8 py-3.5 rounded-xl text-base font-medium transition-all duration-200">
                <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Watch Demo
              </button>
            </a>
          </div>

          <div className="mt-24 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-600 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
