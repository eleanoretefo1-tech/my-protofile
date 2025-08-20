import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NeonButtonProps {
  icon: LucideIcon;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  icon: Icon, 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}) => {
  const baseClasses = "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-green-400/20 to-blue-500/20 border-2 border-green-400/50 text-green-400 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/25",
    secondary: "bg-gradient-to-r from-pink-400/20 to-purple-500/20 border-2 border-pink-400/50 text-pink-400 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-400/25"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* Inner moving sweep highlight */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`h-full w-1/3 translate-x-[-150%] animate-sweep opacity-60 ${variant === 'primary' ? 'bg-gradient-to-r from-green-400/40 via-green-300/30 to-transparent' : 'bg-gradient-to-r from-pink-400/40 via-pink-300/30 to-transparent'}`} />
      </div>
      <Icon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative z-10">{children}</span>
      {/* Outer breathing glow matching variant */}
      <div className={`absolute -inset-1 rounded-full blur-2xl pointer-events-none opacity-70 animate-breathe ${variant === 'primary' ? 'bg-gradient-to-r from-green-400/50 to-blue-500/50' : 'bg-gradient-to-r from-pink-400/50 to-purple-500/50'}`} />
    </button>
  );
};

export default NeonButton;