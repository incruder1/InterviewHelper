import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-neutral-950 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-bold text-white">Interview Helper</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Elevate your interview performance with AI-powered practice and personalized feedback.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-4">
              <li><a href="#features" className="text-neutral-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-neutral-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="text-neutral-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="text-neutral-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Career Tips</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Copyright */}
            <div className="text-neutral-400 text-sm">
              © 2024 Interview Helper. All rights reserved.
            </div>
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 md:justify-end text-sm">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
