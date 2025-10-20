import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Star, Quote } from 'lucide-react';
import { mockData } from '../mock';

const Testimonials = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-900 text-white overflow-hidden">
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
              Что говорят наши{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
                клиенты
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Более 150 успешных проектов и довольные клиенты — наша лучшая реклама
            </p>
          </motion.div>
        </Parallax>

        <div className="grid md:grid-cols-3 gap-8">
          {mockData.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
            >
              {/* Quote Icon */}
              <motion.div 
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Quote className="w-6 h-6 text-white" />
              </motion.div>

              {/* Rating Stars */}
              <div className="flex items-center mb-4 mt-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </motion.div>

                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-2xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <Parallax speed={1}>
          <motion.div 
            className="mt-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8">
                Присоединяйтесь к нашим довольным клиентам
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
                  <div className="text-gray-400">Проектов</div>
                </motion.div>

                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-orange-400 mb-2">98%</div>
                  <div className="text-gray-400">Довольных клиентов</div>
                </motion.div>

                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">5.0</div>
                  <div className="text-gray-400">Средняя оценка</div>
                </motion.div>

                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2">85%</div>
                  <div className="text-gray-400">Повторных заказов</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default Testimonials;