import React from 'react';
import { useState, useEffect } from 'react';
import { Mail, MessageCircle, MessageCircleMore, PhoneCall, MessageSquare } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import GradientText from './components/GradientText';
import NeonButton from './components/NeonButton';
import ProfileImage from './components/ProfileImage';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleContactEmail = () => {
    window.location.href = 'mailto:eleanoretefo1@gmail.com';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/201227866673', '_blank');
  };

  // Loading screen removed; keep stub if needed later

  // Loading screen disabled to improve LCP

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Profile Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="flex justify-center mb-12">
            <ProfileImage />
          </div>
          
          {/* Name with Gradient Animation */}
          <div className="space-y-4">
            <GradientText className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <h1>Mohamed Atef</h1>
            </GradientText>
            <GradientText className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <h2>Abdelsattar</h2>
            </GradientText>
          </div>
          
          {/* Subtitle */}
          <div className="text-gray-300 text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            <p className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Creative Professional & Digital Innovator
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <NeonButton
              icon={Mail}
              onClick={handleContactEmail}
              variant="primary"
            >
              Contact Me
            </NeonButton>
            
            <NeonButton
              icon={MessageCircle}
              onClick={handleWhatsApp}
              variant="secondary"
            >
              WhatsApp
            </NeonButton>
          </div>
          
          {/* Contact Info */}
          <div className="pt-12 space-y-2 text-gray-400 text-sm md:text-base">
            <p className="hover:text-green-400 transition-colors duration-300">
              📧 eleanoretefo1@gmail.com
            </p>
            <p className="hover:text-blue-400 transition-colors duration-300">
              📱 +20 122 786 6673
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-green-400 rounded-full animate-bounce opacity-80 shadow-lg shadow-green-400/50 blur-sm" />
        <div className="absolute top-40 right-20 w-5 h-5 bg-blue-400 rounded-full animate-bounce opacity-80 shadow-lg shadow-blue-400/50 blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-7 h-7 bg-pink-400 rounded-full animate-bounce opacity-80 shadow-lg shadow-pink-400/50 blur-sm" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-80 shadow-lg shadow-purple-400/50 blur-sm" style={{ animationDelay: '0.5s' }} />
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-60" />
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
}

export default App;
