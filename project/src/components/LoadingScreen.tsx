import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [nameIndex, setNameIndex] = useState(0);
  const name = 'mohamed atef';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  useEffect(() => {
    if (progress >= 100) return;
    const typing = setInterval(() => {
      setNameIndex(prev => (prev < name.length ? prev + 1 : prev));
    }, 60);
    return () => clearInterval(typing);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
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
        {/* MA Logo with Neon Effect */}
        <div className="relative">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            MA
          </div>
          {/* Animated sweep highlight over MA */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 h-2/3 animate-sweep bg-gradient-to-r from-white/40 via-white/10 to-transparent rounded-full blur-md" />
          </div>
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/25 via-blue-500/25 to-pink-500/25 rounded-full blur-3xl animate-breathe" />
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <div className="text-xl md:text-2xl font-medium">
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