import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [nameIndex, setNameIndex] = useState(0);
  const name = 'Mohamed Atef Abdelsattar';

  useEffect(() => {
    let rafId: number;
    let startTs: number | null = null;

    const durationMs = 2600; // total loading duration

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onLoadingComplete(), 500);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onLoadingComplete]);

  useEffect(() => {
    if (nameIndex >= name.length) return;
    const timer = setTimeout(() => {
      setNameIndex(prev => prev + 1);
    }, 60);
    return () => clearTimeout(timer);
  }, [nameIndex]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden grid-overlay">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative text-center space-y-8">
        {/* Circular progress ring around MA */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 mx-auto">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
            <circle
              cx="50" cy="50" r="44" fill="none" strokeWidth="5"
              strokeLinejoin="round" strokeLinecap="round"
              stroke="url(#grad)"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${(1 - progress / 100) * 2 * Math.PI * 44}`}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 bg-clip-text text-transparent neon-flicker">
              MA
            </div>
          </div>
          {/* extra rotating ring */}
          <div className="absolute inset-0 rotate-slower rounded-full border-t-2 border-green-400/30" aria-hidden="true" />
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <div className="text-2xl md:text-3xl font-semibold tracking-wide">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              {name.slice(0, nameIndex)}
            </span>
            <span className="typing-caret">|</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-green-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Percentage */}
          <p className="text-lg text-gray-400 font-mono">{progress}%</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;