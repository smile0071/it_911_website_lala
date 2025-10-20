import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Phone, Mail, MessageCircle, Heart } from 'lucide-react';
import { mockData } from '../mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gray-900 text-white pt-20 pb-8">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-blue-400 mb-4">
              IT911
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {mockData.company.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href={`https://t.me/${mockData.contact.social.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle size={20} />
              </motion.a>
              
              <motion.a
                href={`mailto:${mockData.contact.email}`}
                className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Mail size={20} />
              </motion.a>
              
              <motion.a
                href={`tel:${mockData.contact.phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Phone size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-semibold mb-4">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  О компании
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Услуги
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('advantages')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Преимущества
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Отзывы
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Контакты
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-4">Наши услуги</h4>
            <ul className="space-y-3">
              {mockData.services.map((service) => (
                <li key={service.id}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info Bar */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="font-semibold">{mockData.contact.phone}</p>
              <p className="text-sm text-gray-400">Звоните в любое время</p>
            </div>
            
            <div>
              <Mail className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="font-semibold">{mockData.contact.email}</p>
              <p className="text-sm text-gray-400">Ответим в течение часа</p>
            </div>
            
            <div>
              <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="font-semibold">{mockData.contact.social.telegram}</p>
              <p className="text-sm text-gray-400">Быстрая связь в Telegram</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span>© 2024 IT991. Сделано с</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>для вашего бизнеса</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button className="hover:text-white transition-colors">
              Политика конфиденциальности
            </button>
            <button className="hover:text-white transition-colors">
              Пользовательское соглашение
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  );
};

export default Footer;