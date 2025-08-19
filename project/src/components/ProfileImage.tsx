import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative group">
      {/* Outer glow ring */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 p-1 animate-spin-slow shadow-2xl shadow-green-400/50">
        <div className="w-full h-full rounded-full bg-transparent" />
      </div>
      
      {/* Inner glow ring */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500 via-green-400 to-blue-500 p-1 animate-spin-reverse shadow-xl shadow-blue-400/40">
        <div className="w-full h-full rounded-full bg-transparent" />
      </div>
      
      {/* Profile image container */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-gray-700 group-hover:scale-105 transition-all duration-500 bg-white">
        <img
          src="/photo_2025-08-19_02-14-04.jpg"
          width="256"
          height="256"
          fetchpriority="high"
          alt="Mohamed Atef Abdelsattar"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            // Fallback to a placeholder if image doesn't load
            const target = e.target as HTMLImageElement;
            target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";
          }}
        />
      </div>
      
      {/* Pulsing glow effect */}
      <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-green-400/20 via-blue-500/20 to-pink-500/20 animate-pulse blur-3xl" />
      
      {/* Additional rotating glow */}
      <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-transparent via-green-400/15 to-transparent animate-spin-slow blur-2xl" />
    </div>
  );
};

export default ProfileImage;