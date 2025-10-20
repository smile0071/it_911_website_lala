import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      {/* Background Spline Animation */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <Parallax speed={-5}>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Превращаем{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                  идеи
                </span>
                <br />
                в цифровые решения
              </motion.h1>
            </Parallax>

            <Parallax speed={-3}>
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Создаём сайты, внедряем CRM и разрабатываем телеграм-ботов, 
                которые автоматизируют ваш бизнес и увеличивают прибыль
              </motion.p>
            </Parallax>

            <Parallax speed={-1}>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button
                  onClick={scrollToContact}
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Оставить заявку
                  <ArrowRight size={20} />
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('services');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Узнать больше
                </motion.button>
              </motion.div>
            </Parallax>
          </div>

          {/* Right side - additional space for 3D animation */}
          <div className="hidden md:block">
            {/* This space allows the Spline animation to be more visible */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;