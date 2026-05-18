import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Wind, Settings2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Meditation() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'wait'>('inhale');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (!isActive) return;
    
    let phaseTime = 4000;
    const cycle = () => {
      setPhase('inhale');
      setTimeout(() => setPhase('hold'), 4000);
      setTimeout(() => setPhase('exhale'), 8000);
      setTimeout(() => setPhase('wait'), 12000);
    };

    const phaseTimer = setInterval(cycle, 16000);
    cycle();

    return () => clearInterval(phaseTimer);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(300);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-[#111827]">Breathe in. Let go.</h2>
        <p className="text-[#64748B]">Find your center and peace within the chaos.</p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Breathing Circle */}
        <motion.div 
          animate={{
            scale: isActive ? (phase === 'inhale' ? 1.4 : phase === 'hold' ? 1.4 : phase === 'exhale' ? 0.8 : 0.8) : 1,
            backgroundColor: isActive ? (phase === 'inhale' ? 'rgba(45, 106, 79, 0.2)' : 'rgba(45, 106, 79, 0.4)') : 'rgba(45, 106, 79, 0.1)'
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-64 h-64 rounded-full border-4 border-[#2D6A4F] flex flex-col items-center justify-center p-8 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="space-y-4"
            >
              <Wind className="mx-auto text-[#2D6A4F]" size={32} />
              <div className="space-y-1">
                <p className="text-3xl font-black text-[#111827] tabular-nums">
                  {formatTime(timeLeft)}
                </p>
                <p className="text-sm font-bold text-[#2D6A4F] uppercase tracking-widest">
                  {isActive ? phase : 'Ready?'}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Ambient background glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-[#2D6A4F]/10 rounded-full blur-3xl -z-10"
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className="flex items-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-2xl font-bold shadow-xl shadow-[#2D6A4F]/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          {isActive ? 'Pause' : 'Start Session'}
        </button>
        <button 
          onClick={resetTimer}
          className="p-4 bg-white border border-[#E1E3E5] text-[#64748B] rounded-2xl hover:bg-[#F8FAFC] transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {[
          { label: 'Session Length', value: '5:00', icon: Clock },
          { label: 'Ambient Sounds', value: 'Rainforest', icon: Wind },
          { label: 'Breathe Mode', value: 'Box (4-4-4-4)', icon: Settings2 },
        ].map((pref) => (
          <div key={pref.label} className="p-6 bg-white border border-[#E1E3E5] rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#2D6A4F]">
              <pref.icon size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#94A3B8] uppercase">{pref.label}</p>
              <p className="text-sm font-bold text-[#1F2937]">{pref.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
