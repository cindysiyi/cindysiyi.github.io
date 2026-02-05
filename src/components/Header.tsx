import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center text-white mix-blend-difference">
      {/* Left Side: Contact Info */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-light tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            WECHAT
          </span>
        </div>
        
        <div className="h-4 w-[1px] bg-white/30"></div>
        
        <div className="flex items-center space-x-4 text-sm font-light tracking-wide">
          <a href="mailto:contact@example.com" className="hover:opacity-70 transition-opacity">
            contact@example.com
          </a>
        </div>
      </div>

      {/* Right Side: Navigation */}
      <nav>
        <ul className="flex space-x-8 text-sm font-medium tracking-widest uppercase">
          <li>
            <a href="#home" className="hover:text-gray-300 transition-colors">Home</a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-gray-300 transition-colors">Projects</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
