import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        onLoaded();
      }, 600);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6F0] transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Beating Heart Icon with Gold Glow */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-[#F4A6B8]/20 animate-ping opacity-75" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#C47B89] via-[#9B4F60] to-[#DFCCA4] p-1 shadow-xl flex items-center justify-center animate-heart-beat">
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
              <span className="font-serif-luxury text-xs font-bold tracking-wide whitespace-nowrap text-[#733140]">
                Mr &amp; Mrs
              </span>
              <Heart className="w-4 h-4 fill-[#C47B89] text-[#C47B89] mt-0.5" />
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-wide text-[#733140] mb-2">
          Mr. &amp; Mrs.
        </p>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#A37F4B]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Opening Our 6-Month Love Story...</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
};
