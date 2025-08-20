import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-float-soft">
      {/* Subtle neon ring with very slow rotation */}
      <div
        className="absolute -inset-4 rounded-full bg-gradient-to-tr from-green-400/35 via-blue-500/30 to-pink-500/35 blur-xl opacity-90 motion-safe:animate-spin-very-slow"
        aria-hidden="true"
      />

      {/* Crisp thin gradient border (no shadow) */}
      <div className="absolute -inset-[4px] rounded-full bg-gradient-to-r from-green-400/40 via-transparent to-pink-500/40" aria-hidden="true" />

      {/* Image container with subtle lighting overlay */}
      <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
        <img
          src="/photo_2025-08-19_02-14-04.jpg"
          width="256"
          height="256"
          fetchpriority="high"
          alt="Mohamed Atef Abdelsattar"
          className="w-full h-full object-cover rounded-full select-none border-none shadow-none ring-0 outline-none drop-shadow-none"
          style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full soft-light-overlay" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ProfileImage;