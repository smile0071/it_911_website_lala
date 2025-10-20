import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Target, Users, Award, Lightbulb } from 'lucide-react';
import { mockData } from '../mock';

const About = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
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
              О компании{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                IT911
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {mockData.company.description}
            </p>
          </motion.div>
        </Parallax>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Mission & Values */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Наша миссия</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Мы помогаем бизнесу расти через современные цифровые технологии. 
              Каждое решение создаём с фокусом на результат - увеличение продаж, 
              автоматизацию процессов и повышение эффективности работы.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Фокус на результате</h4>
                  <p className="text-gray-600">Каждый проект должен приносить измеримую пользу вашему бизнесу</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Инновационный подход</h4>
                  <p className="text-gray-600">Используем только современные технологии и лучшие практики</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Партнёрский подход</h4>
                  <p className="text-gray-600">Мы становимся частью вашей команды на время проекта</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Stats & Achievements */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Наши достижения</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                  <div className="text-gray-600">Проектов запущено</div>
                </motion.div>

                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                  <div className="text-gray-600">Довольных клиентов</div>
                </motion.div>

                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
                  <div className="text-gray-600">Средний рост продаж</div>
                </motion.div>

                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">5 лет</div>
                  <div className="text-gray-600">Опыт команды</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;