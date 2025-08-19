import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

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
          
          {/* Glowing rings around MA */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 border-2 border-green-400/30 rounded-full animate-spin-slow" />
            <div className="absolute w-40 h-40 md:w-48 md:h-48 border-2 border-blue-400/30 rounded-full animate-spin-reverse" />
            <div className="absolute w-32 h-32 md:w-40 md:h-40 border-2 border-pink-400/30 rounded-full animate-spin-slow" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-light text-gray-300 animate-pulse">
            Loading Portfolio...
          </h2>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-green-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Percentage */}
          <p className="text-lg text-gray-400 font-mono">
            {progress}%
          </p>
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