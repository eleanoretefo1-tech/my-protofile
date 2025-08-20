import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float-soft">
      {/* Subtle neon ring with very slow rotation */}
      <div
        className="absolute -inset-2 rounded-full bg-gradient-to-tr from-green-400/20 via-blue-500/20 to-pink-500/20 blur-md opacity-70 motion-safe:animate-spin-very-slow"
        aria-hidden="true"
      />

      {/* Crisp thin gradient border (no shadow) */}
      <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-green-400/25 via-transparent to-pink-500/25" aria-hidden="true" />

      {/* Image container with subtle lighting overlay */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
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