import React from 'react';

interface Logo3DProps {
  className?: string;
}

const Logo3D: React.FC<Logo3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none ${className}`} aria-label="MA logo 3D">
      {/* Subtle rotating sheen ring behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full ring-sheen animate-spin-slow" />
          <div className="absolute inset-0 rounded-full border border-cyan-300/30" />
        </div>
      </div>

      {/* Main 3D extruded text */}
      <div className="relative flex items-center justify-center">
        <span className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-emerald-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent text-extrude-ma neon-3d-glow tilt-sway">
          MA
        </span>

        {/* Moving shine sweep */}
        <span className="absolute inset-x-[-20%] -top-2 h-10 pointer-events-none">
          <span className="block h-full w-1/3 bg-white/30 blur-md rounded-full animate-sweep" />
        </span>
      </div>

      {/* Reflection */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 scale-y-[-1] opacity-35 pointer-events-none">
        <span className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-emerald-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent blur-[1px] mask-fade-b">
          MA
        </span>
      </div>
    </div>
  );
};

export default Logo3D;

