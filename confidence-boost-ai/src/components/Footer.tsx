import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-[#121327] bg-[#0A0B14] py-8 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Link to="/">
              <img 
                src="/cogniview.png.png" 
                alt="Cogniview Logo" 
                className="h-12 w-12 mr-3" 
              />
            </Link>
            <Link to="/">  
              <span className="text-xl font-bold font-['Urbanist'] text-[#FFE066]">Cogniview</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8 mb-6 md:mb-0">
            <Link to="/" className="text-[#E2E4ED]/70 hover:text-[#FFE066] font-['Urbanist'] text-sm transition-colors px-2 py-1">Home</Link>
            <Link to="/simulate" className="text-[#E2E4ED]/70 hover:text-[#FFE066] font-['Urbanist'] text-sm transition-colors px-2 py-1">Practice</Link>
            <Link to="/feedback" className="text-[#E2E4ED]/70 hover:text-[#FFE066] font-['Urbanist'] text-sm transition-colors px-2 py-1">Feedback</Link>
            <Link to="/progress" className="text-[#E2E4ED]/70 hover:text-[#FFE066] font-['Urbanist'] text-sm transition-colors px-2 py-1">Progress</Link>
            <Link to="/about" className="text-[#E2E4ED]/70 hover:text-[#FFE066] font-['Urbanist'] text-sm transition-colors px-2 py-1">About</Link>
            <Link to="/contact" className="text-[#E2E4ED]/70 hover:text-[#FFE066] font-['Urbanist'] text-sm transition-colors px-2 py-1">Contact</Link>
          </div>
          
          <div className="flex items-center">
            <a 
              href="https://github.com/Cogniview-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E2E4ED]/50 hover:text-[#FFE066] transition-colors p-2 rounded-full hover:bg-[#121327]/60"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[#121327] flex flex-col md:flex-row justify-between items-center text-[#E2E4ED]/40 text-sm font-['Urbanist']">
          <p>© 2023 Cogniview. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-[#FFE066] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#FFE066] transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#FFE066] transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 