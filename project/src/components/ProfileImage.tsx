import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-glow-strong motion-safe:animate-float-fast" aria-hidden="true" />
      <div className="relative rounded-2xl p-[4px] bg-gradient-to-tr from-green-400/70 via-blue-500/60 to-pink-500/70 animate-gradient-x animate-pulse-glow-strong motion-safe:animate-float-fast">
        <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-2xl overflow-hidden bg-gray-900/40">
          {/* snake-like glow runner around the frame */}
          <div className="ring-runner rounded-2xl" aria-hidden="true" />
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
          <div className="pointer-events-none absolute inset-0 soft-light-overlay opacity-40" aria-hidden="true" />
          {/* Animated gradient glow layer behind content for stronger lighting */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-3xl blur-2xl opacity-40 animate-gradient-x"
            style={{
              background: 'linear-gradient(90deg, rgba(16,185,129,0.45), rgba(59,130,246,0.4), rgba(236,72,153,0.45))'
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 100% at 50% 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.22) 100%)' }} aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;