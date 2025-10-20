import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { mockData } from '../mock';
import { useToast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real API submission instead of mock
  const submitForm = async (formData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Ошибка отправки заявки');
      }

      return data;
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await submitForm(formData);
      
      if (result.success) {
        toast({
          title: "Заявка отправлена!",
          description: result.message,
        });
        
        // Reset form
        setFormData({ name: '', email: '', service: '', message: '' });
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: error.message || "Попробуйте еще раз или свяжитесь с нами по телефону",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <Parallax speed={-2}>
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы начать{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
                проект?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами в течение часа для обсуждения деталей
            </p>
          </motion.div>
        </Parallax>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Оставить заявку</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-300 ${
                    errors.name ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="Введите ваше имя"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-300 ${
                    errors.email ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="ваш@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  Интересующая услуга
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                >
                  <option value="" className="text-gray-900">Выберите услугу</option>
                  <option value="website" className="text-gray-900">Создание веб-сайта</option>
                  <option value="crm" className="text-gray-900">CRM-система</option>
                  <option value="bot" className="text-gray-900">Телеграм-бот</option>
                  <option value="complex" className="text-gray-900">Комплексное решение</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-white/20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-white placeholder-gray-300 ${
                    errors.message ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="Расскажите о вашем проекте..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Отправить заявку
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Предпочитаете прямое общение? Мы всегда готовы ответить на ваши вопросы 
                и обсудить ваш проект удобным для вас способом.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Телефон</h4>
                  <p className="text-gray-300">{mockData.contact.phone}</p>
                  <p className="text-sm text-gray-400">Звонок бесплатный</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-orange-500 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <p className="text-gray-300">{mockData.contact.email}</p>
                  <p className="text-sm text-gray-400">Ответим в течение часа</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-green-500 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Telegram</h4>
                  <p className="text-gray-300">{mockData.contact.social.telegram}</p>
                  <p className="text-sm text-gray-400">Быстрый ответ</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Часы работы</h4>
                  <p className="text-gray-300">{mockData.contact.workingHours}</p>
                  <p className="text-sm text-gray-400">По Московскому времени</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-red-500 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Адрес</h4>
                  <p className="text-gray-300">{mockData.contact.address}</p>
                  <p className="text-sm text-gray-400">Работаем удалённо по всей России</p>
                </div>
              </motion.div>
            </div>

            {/* Quick action buttons */}
            <div className="pt-6 space-y-4">
              <motion.a
                href={`tel:${mockData.contact.phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Позвонить сейчас
              </motion.a>
              
              <motion.a
                href={`https://t.me/${mockData.contact.social.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Написать в Telegram
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;