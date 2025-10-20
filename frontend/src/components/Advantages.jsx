import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Target, Zap, Headphones, TrendingUp } from 'lucide-react';
import { mockData } from '../mock';

const Advantages = () => {
  const advantageIcons = {
    target: Target,
    zap: Zap,
    headphones: Headphones,
    'trending-up': TrendingUp
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="advantages" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
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
              Почему выбирают{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                именно нас?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы не просто выполняем задачи — мы создаём решения, которые работают на ваш бизнес
            </p>
          </motion.div>
        </Parallax>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockData.advantages.map((advantage, index) => {
            const IconComponent = advantageIcons[advantage.icon];
            
            return (
              <motion.div
                key={advantage.id}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5
                }}
              >
                {/* Icon with animated background */}
                <motion.div 
                  className="relative mx-auto mb-6 w-20 h-20"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Animated ring */}
                  <motion.div 
                    className="absolute inset-0 border-4 border-blue-200 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>

                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-2xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom section with additional benefits */}
        <Parallax speed={1}>
          <motion.div 
            className="mt-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-12 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Гарантируем результат
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">30 дней</div>
                  <div className="text-gray-600">Гарантия на все работы</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">Техническая поддержка</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-gray-600">Соблюдение сроков</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default Advantages;