import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative animate-float-soft">
      <div className="absolute -inset-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10" aria-hidden="true" />
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-tr from-green-400/30 via-blue-500/20 to-pink-500/30">
        <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-2xl overflow-hidden bg-gray-900/40">
          <img
            src="/photo_2025-08-19_02-14-04.jpg"
            width="320"
            height="384"
            fetchpriority="high"
            alt="Mohamed Atef Abdelsattar"
            className="absolute inset-0 w-full h-full object-cover select-none border-none shadow-none ring-0 outline-none"
            style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600";
            }}
          />
          <div className="pointer-events-none absolute inset-0 soft-light-overlay" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 100% at 50% 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.22) 100%)' }} aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;