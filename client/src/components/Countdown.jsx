import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate, inline = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Inline format for mobile: 10D 05H 30M 20S
  if (inline) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-flex items-center gap-1 text-white font-bold"
      >
        <span className="text-cyan-400">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-slate-400 text-sm">D</span>
        <span className="text-slate-600 mx-1">|</span>
        <span className="text-cyan-400">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-slate-400 text-sm">H</span>
        <span className="text-slate-600 mx-1">|</span>
        <span className="text-cyan-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-slate-400 text-sm">M</span>
        <span className="text-slate-600 mx-1">|</span>
        <span className="text-cyan-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-slate-400 text-sm">S</span>
      </motion.div>
    );
  }

  const TimeUnit = ({ value, label }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div className="glass-card rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
        <span className="text-3xl md:text-5xl font-bold gradient-text">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-sm md:text-base text-slate-400 font-medium">{label}</span>
    </motion.div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;
