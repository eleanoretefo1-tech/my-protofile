import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-float-soft">
      {/* Professional static halo matching background colors (no rotation) */}
      <div
        className="absolute -inset-10 rounded-full blur-3xl opacity-80"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.22) 0%, rgba(59,130,246,0.18) 45%, rgba(236,72,153,0.18) 75%, rgba(0,0,0,0) 90%)'
        }}
        aria-hidden="true"
      />

      {/* Thin professional gradient ring around the image */}
      <div className="relative rounded-full p-[2px] bg-gradient-to-tr from-green-400/35 via-blue-500/25 to-pink-500/35">
        <div className="relative rounded-full overflow-hidden">
          {/* Image container with subtle lighting overlay */}
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
            <img
              src="/photo_2025-08-19_02-14-04.jpg"
              width="256"
              height="256"
              fetchpriority="high"
              alt="Mohamed Atef Abdelsattar"
              className="w-full h-full object-cover rounded-full select-none border-none shadow-none ring-0 outline-none drop-shadow-none transition-transform duration-500 ease-out hover:scale-[1.01]"
              style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-full soft-light-overlay" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;