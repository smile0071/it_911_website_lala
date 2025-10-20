import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="text-2xl font-bold text-blue-600"
            whileHover={{ scale: 1.05 }}
          >
            IT911
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Услуги
            </button>
            <button 
              onClick={() => scrollToSection('advantages')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Преимущества
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Отзывы
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Оставить заявку
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <button 
              onClick={() => scrollToSection('about')}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Услуги
            </button>
            <button 
              onClick={() => scrollToSection('advantages')}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Преимущества
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Отзывы
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full text-center"
            >
              Оставить заявку
            </button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;