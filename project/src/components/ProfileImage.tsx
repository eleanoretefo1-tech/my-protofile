import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative">
      <img
        src="/photo_2025-08-19_02-14-04.jpg"
        width="256"
        height="256"
        fetchpriority="high"
        alt="Mohamed Atef Abdelsattar"
        className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full select-none border-none shadow-none ring-0 outline-none drop-shadow-none"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";
        }}
      />
    </div>
  );
};

export default ProfileImage;