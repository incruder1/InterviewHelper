import { useState } from 'react';
import Link from 'next/link';
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideBoundary, setHideBoundary] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
    setHideBoundary(true);
    setTimeout(() => setHideBoundary(false), 0); // Reset the state to re-enable boundary
  };

  return (
    <section id="navbar_hero" className="relative min-h-[70vh]  bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden pb-6">
      {/* Navigation */}
      <div className="relative z-50">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center text-white">
              <span className="text-2xl font-bold font-heading">Interview Helper</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="#features" className="text-neutral-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-neutral-300 hover:text-white transition-colors">
                How it Works
              </Link>
              <Link href="#faq" className="text-neutral-300 hover:text-white transition-colors">
                FAQ
              </Link>
              <a  href='/dashboard'>
              <button className="bg-blue-800 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-colors">
                Get Started
              </button> </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleClick}
              type="button"
              className={`lg:hidden text-neutral-400 hover:text-white ${hideBoundary ? 'focus:outline-none' : ''
                }`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {!isOpen ? <FaBars size={20} color="white" /> : <ImCross color="white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden absolute top-20 left-0 right-0 bg-neutral-800/80 backdrop-blur-lg transition duration-150"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                <Link href="#features" className="block px-4 py-2 text-neutral-300 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="block px-4 py-2 text-neutral-300 hover:text-white transition-colors">
                  How it Works
                </Link>
                <Link href="#pricing" className="block px-4 py-2 text-neutral-300 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="#faq" className="block px-4 py-2 text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
                <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Hero Content */}
      
      <div className="container mx-auto px-4 pt-20 lg:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Master Your Interview Skills with AI
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-8">
            Practice interviews with Google Gemini AI and get real-time feedback to improve your chances of landing your dream job.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/dashboard">
              <button className="bg-blue-600 hover:bg-blue-400 text-white px-8 py-3 rounded-full text-lg transition-colors">
                Start Practicing Now
              </button>
            </a>
            <a href='https://www.youtube.com/watch?v=MSofyQuiF9Y&feature=youtu.be'>
            <button className="border border-neutral-400 text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg transition-colors">
              Watch Demo
            </button> 
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-neutral-300">Practice Sessions</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-neutral-300">Success Rate</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-neutral-300">Interview Types</div>
          </div>
        </div>
      </div>
    </section>
  );
}
