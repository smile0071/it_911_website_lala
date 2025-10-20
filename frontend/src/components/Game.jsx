import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Play, Pause, RotateCcw, Trophy, Zap } from 'lucide-react';
import { mockData } from '../mock';

const Game = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bonuses, setBonuses] = useState([]);
  const [clickAnimation, setClickAnimation] = useState({ show: false, x: 0, y: 0 });
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(() => 
    parseInt(localStorage.getItem('IT991GameScore') || '0')
  );

  // Generate random bonus
  const generateBonus = useCallback(() => {
    const bonus = mockData.game.bonuses[Math.floor(Math.random() * mockData.game.bonuses.length)];
    const newBonus = {
      id: Date.now() + Math.random(),
      ...bonus,
      x: Math.random() * 80 + 10, // 10-90% of container width
      y: Math.random() * 60 + 20, // 20-80% of container height
      scale: Math.random() * 0.5 + 0.75 // 0.75-1.25 scale
    };
    
    setBonuses(prev => [...prev, newBonus]);
    
    // Remove bonus after 3 seconds
    setTimeout(() => {
      setBonuses(prev => prev.filter(b => b.id !== newBonus.id));
    }, 3000);
  }, []);

  // Game timer
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Generate bonuses during gameplay
  useEffect(() => {
    let bonusTimer;
    if (isPlaying) {
      bonusTimer = setInterval(() => {
        generateBonus();
      }, 800); // Generate bonus every 800ms
    }
    return () => clearInterval(bonusTimer);
  }, [isPlaying, generateBonus]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setCombo(0);
    setBonuses([]);
  };

  const pauseGame = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(30);
    setCombo(0);
    setBonuses([]);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('IT991GameScore', score.toString());
    }
  };

  const clickBonus = (bonus, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Show click animation
    setClickAnimation({ show: true, x, y });
    setTimeout(() => setClickAnimation({ show: false, x: 0, y: 0 }), 500);
    
    // Remove clicked bonus
    setBonuses(prev => prev.filter(b => b.id !== bonus.id));
    
    // Update score with combo multiplier
    const comboMultiplier = Math.floor(combo / 5) + 1;
    const pointsEarned = bonus.points * comboMultiplier;
    setScore(prev => prev + pointsEarned);
    setCombo(prev => prev + 1);
  };

  const gameAreaClick = (event) => {
    if (!isPlaying) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Show miss animation
    setClickAnimation({ show: true, x, y });
    setTimeout(() => setClickAnimation({ show: false, x: 0, y: 0 }), 300);
    
    // Reset combo on miss
    setCombo(0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <Parallax speed={-1}>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {mockData.game.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {mockData.game.description}
            </p>
          </motion.div>
        </Parallax>

        <div className="max-w-4xl mx-auto">
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-yellow-400">{score}</div>
              <div className="text-sm text-gray-300">Очки</div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-400">{timeLeft}s</div>
              <div className="text-sm text-gray-300">Время</div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-green-400">x{Math.floor(combo / 5) + 1}</div>
              <div className="text-sm text-gray-300">Множитель</div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-orange-400">{highScore}</div>
              <div className="text-sm text-gray-300">Рекорд</div>
            </motion.div>
          </div>

          {/* Game Controls */}
          <div className="flex justify-center gap-4 mb-8">
            {!isPlaying && timeLeft === 30 ? (
              <motion.button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} />
                Начать игру
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={pauseGame}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  {isPlaying ? 'Пауза' : 'Продолжить'}
                </motion.button>
                
                <motion.button
                  onClick={resetGame}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={20} />
                  Заново
                </motion.button>
              </>
            )}
          </div>

          {/* Game Area */}
          <motion.div
            className="relative bg-black/20 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden"
            style={{ height: '400px' }}
            onClick={gameAreaClick}
            whileHover={{ scale: isPlaying ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            
            {/* Click animation */}
            <AnimatePresence>
              {clickAnimation.show && (
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ left: clickAnimation.x, top: clickAnimation.y }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-8 h-8 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bonuses */}
            <AnimatePresence>
              {bonuses.map((bonus) => (
                <motion.button
                  key={bonus.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                  style={{ 
                    left: `${bonus.x}%`, 
                    top: `${bonus.y}%`,
                    color: bonus.color
                  }}
                  onClick={(e) => clickBonus(bonus, e)}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: bonus.scale, 
                    rotate: 360,
                    y: [0, -10, 0]
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    scale: { duration: 0.3 },
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: bonus.scale * 1.2 }}
                  whileTap={{ scale: bonus.scale * 0.9 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    style={{ backgroundColor: bonus.color }}
                  >
                    {bonus.name}
                    <div className="text-xs absolute -bottom-2 bg-black/50 px-2 py-1 rounded">
                      +{bonus.points}
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Game instructions */}
            {!isPlaying && timeLeft === 30 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/70">
                  <Trophy size={48} className="mx-auto mb-4 text-yellow-400" />
                  <p className="text-lg mb-2">Кликай по бонусам и набирай очки!</p>
                  <p className="text-sm">Собери комбо для увеличения множителя</p>
                </div>
              </div>
            )}

            {/* Game over */}
            {!isPlaying && timeLeft === 0 && (
              <motion.div 
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center text-white">
                  <Trophy size={64} className="mx-auto mb-4 text-yellow-400" />
                  <h3 className="text-2xl font-bold mb-2">Игра окончена!</h3>
                  <p className="text-lg mb-4">Ваш счёт: <span className="font-bold text-yellow-400">{score}</span></p>
                  {score === highScore && score > 0 && (
                    <p className="text-green-400 font-semibold mb-4">🎉 Новый рекорд!</p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Combo indicator */}
          {combo > 0 && isPlaying && (
            <motion.div
              className="text-center mt-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={combo}
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg">
                <Zap size={20} />
                Комбо: {combo}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Game;