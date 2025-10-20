import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Globe, Database, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { mockData } from '../mock';

const Services = () => {
  const serviceIcons = {
    1: Globe,
    2: Database, 
    3: MessageCircle
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наши{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                услуги
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Комплексные решения для цифровой трансформации вашего бизнеса
            </p>
          </motion.div>
        </Parallax>

        <div className="grid md:grid-cols-3 gap-8">
          {mockData.services.map((service, index) => {
            const IconComponent = serviceIcons[service.id];
            
            return (
              <motion.div
                key={service.id}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Service Icon */}
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                {/* Service Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex}
                      className="flex items-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Price and Duration */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Стоимость</span>
                    <span className="font-semibold text-gray-900">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Срок</span>
                    <span className="font-semibold text-gray-900">{service.duration}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={scrollToContact}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Заказать
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Parallax speed={1}>
          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-lg text-gray-600 mb-6">
              Не нашли нужную услугу? Мы создаём индивидуальные решения под любые задачи
            </p>
            <motion.button
              onClick={scrollToContact}
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Обсудить проект
            </motion.button>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default Services;