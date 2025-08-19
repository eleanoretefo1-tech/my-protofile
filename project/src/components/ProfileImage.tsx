import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative group">
      {/* Soft gradient halo */}
      <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-green-400/20 via-blue-500/10 to-pink-500/20 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />

      {/* Subtle gradient ring (no motion) */}
      <div className="relative p-[3px] rounded-full bg-gradient-to-r from-white/12 to-white/5 shadow-xl shadow-black/20">
        <div className="rounded-full overflow-hidden bg-gray-900">
          <img
            src="/photo_2025-08-19_02-14-04.jpg"
            width="256"
            height="256"
            fetchpriority="high"
            alt="Mohamed Atef Abdelsattar"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full transition-transform duration-500 group-hover:scale-[1.02]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;