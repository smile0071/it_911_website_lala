import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { mockData } from '../mock';
import { useToast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
  setFormData({ name: '', email: '', phone: '', message: '' });
  setErrors({});
  };

  // Format phone while typing:
  const formatPhone = (input) => {
    if (!input) return '';
    // remove all except digits and plus
    const cleanedAll = input.replace(/[^\d+]/g, ''); // may include leading +
    const digitsOnly = input.replace(/\D/g, '');

    // Detect variants
    const startsWithPlus998 = cleanedAll.startsWith('+998');
    const startsWith998 = digitsOnly.startsWith('998');

    // If user types a local number starting with '9' (e.g. 90...), auto-prepend 998 and format to +998 ...
    if (!startsWithPlus998 && !startsWith998 && digitsOnly.startsWith('9')) {
      // treat as if user entered 998 + rest
      const rest = (digitsOnly.length > 0) ? digitsOnly.slice(1) : '';
      // build full digits after country code: we want after removing leading '9' we still keep operator+rest
      // but simpler: prepend '998' to the original digits (so '90...' -> '99890...')
      const full = '998' + digitsOnly;
      const afterCC = full.slice(3); // digits after '998'
      const p1 = afterCC.slice(0, 2);
      const p2 = afterCC.slice(2, 5);
      const p3 = afterCC.slice(5, 7);
      const p4 = afterCC.slice(7, 9);
      const parts = [];
      if (p1) parts.push(p1);
      if (p2) parts.push(p2);
      if (p3) parts.push(p3);
      if (p4) parts.push(p4);
      return '+998' + (parts.length ? ' ' + parts.join(' ') : '');
    }

    // Treat numbers starting with '+998' or '998' as international and format to "+998 90 123 45 67"
    if (startsWithPlus998 || startsWith998) {
      const rest = digitsOnly.slice(3); // remove country code
      const p1 = rest.slice(0, 2);
      const p2 = rest.slice(2, 5);
      const p3 = rest.slice(5, 7);
      const p4 = rest.slice(7, 9);
      const parts = [];
      if (p1) parts.push(p1);
      if (p2) parts.push(p2);
      if (p3) parts.push(p3);
      if (p4) parts.push(p4);
      return '+998' + (parts.length ? ' ' + parts.join(' ') : '');
    }

    // Local formatting: 90 123 45 67 (group 2-3-2-2)
    const digits = digitsOnly;
    const g1 = digits.slice(0, 2);
    const g2 = digits.slice(2, 5);
    const g3 = digits.slice(5, 7);
    const g4 = digits.slice(7, 9);
    const parts = [];
    if (g1) parts.push(g1);
    if (g2) parts.push(g2);
    if (g3) parts.push(g3);
    if (g4) parts.push(g4);
    return parts.join(' ');
  };

  // Ensure +998 is present on blur for local numbers or format digit-only 998... entries
  const handlePhoneBlur = () => {
    const current = (formData.phone || '').trim();
    if (!current) return;

    const digitsOnly = current.replace(/\D/g, '');

    // If user entered local 9-digit number like "90 123 45 67" -> add country code
    if (!current.startsWith('+998') && digitsOnly.length === 9) {
      // prepend 998 and format
      const newVal = formatPhone('998' + digitsOnly);
      setFormData(prev => ({ ...prev, phone: newVal }));
      return;
    }

    // If user entered digits-only international form like "998901234567", format it
    if (!current.startsWith('+') && digitsOnly.startsWith('998') && digitsOnly.length === 12) {
      const newVal = formatPhone(digitsOnly);
      setFormData(prev => ({ ...prev, phone: newVal }));
      return;
    }
    // Otherwise, if they typed "998..." with separators, ensure formatting
    if (digitsOnly.startsWith('998') && !current.startsWith('+998')) {
      const newVal = formatPhone(digitsOnly);
      setFormData(prev => ({ ...prev, phone: newVal }));
    }
  };

  // Auto-insert +998 on focus if the field is empty (so user doesn't have to type country code)
  const handlePhoneFocus = () => {
    const current = (formData.phone || '').trim();
    if (!current) {
      setFormData(prev => ({ ...prev, phone: '+998 ' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formatted = formatPhone(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
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

    // Phone validation:
    // - If value starts with "+998" require exact spaced format OR accept digits-only starting with "998" and length 12
    // - Otherwise validate using provided helper (digits-only length and allowed separators)
    const uzPhoneRegex = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    const digitsOnly = formData.phone.replace(/\D/g, '');

    const validatePhone = (phone) => {
      // phone без +998
      const digits = phone.replace(/[^\d]/g, "");
      // Длина номера (без пробелов и прочего)
      if (digits.length < 9 || digits.length > 12) {
        return false;
      }
      const re = /^[0-9\s\-()]{9,12}$/;
      return re.test(String(phone));
    };

    if (!formData.phone.trim()) {
      newErrors.phone = 'Номер телефона обязателен для заполнения';
    } else {
      // Accept "+998 90 123 45 67" OR "998901234567" (digits-only) or local variants like "90 123 45 67"
      if (formData.phone.startsWith('+998')) {
        if (!uzPhoneRegex.test(formData.phone)) {
          newErrors.phone = 'Номер телефона должен быть в формате +998 90 123 45 67 (с пробелами)';
        }
      } else if (digitsOnly.startsWith('998')) {
        // digits-only international form: must be exactly 12 digits (998 + 9)
        if (digitsOnly.length !== 12) {
          newErrors.phone = 'Номер телефона должен содержать 12 цифр для кода 998 (например: 998901234567 или +998 90 123 45 67)';
        }
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Неверный формат номера. Либо +998 90 123 45 67, либо локально: 90 123 45 67';
      }
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
      const isSuccess = result?.success ?? true;

      if (!isSuccess) {
        throw new Error(result?.message || 'Ошибка отправки заявки');
      }

      toast({
        title: "Заявка отправлена!",
        description: result?.message || "Спасибо! Мы свяжемся с вами в течение часа.",
      });

      

      // Clear form after confirmed success
      resetForm();
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Ошибка отправки",
        description: error.message || "Попробуйте еще раз или свяжитесь с нами по телефону",
        variant: "destructive",
      });
      // keep form values so user can retry
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
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handlePhoneFocus}
                  onBlur={handlePhoneBlur}
                  className={`w-full px-4 py-3 bg-white/20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-300 ${
                    errors.phone ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="+998 90 123 45 67"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                )}
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
                  <p className="text-sm text-gray-400">Работаем по всему Узбекистану</p>
                </div>
              </motion.div>
            </div>

            {/* Quick action buttons */}
            <div className="pt-6 space-y-4">
                          
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
