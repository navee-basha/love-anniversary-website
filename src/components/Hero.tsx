import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, Calendar, Sparkles } from 'lucide-react';
import { CoupleProfile } from '../types';

interface HeroProps {
  couple: CoupleProfile;
  onExploreClick: () => void;
}

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export const Hero: React.FC<HeroProps> = ({ couple, onExploreClick }) => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    const weddingTime = new Date(couple.weddingDate).getTime();

    const calculateElapsed = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - weddingTime);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: Math.floor(diff / 1000),
      });
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);
    return () => clearInterval(interval);
  }, [couple.weddingDate]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Blurred ambient backdrop from the same photo */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={couple.heroImage}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-110 blur-2xl opacity-70"
        />
        {/* Soft luxury champagne & blush gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/70 to-[#FAF6F0]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#F4A6B8]/15 to-[#733140]/20 mix-blend-multiply" />
      </div>

      <div className="relative z-20 max-w-6xl w-full mx-auto px-6 pt-24 pb-12 lg:py-24 grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
      {/* Framed portrait — shown whole so both faces are fully visible */}
      <div className="order-first lg:order-last flex justify-center" data-reveal="zoom" style={{ animationDelay: '150ms' }}>
        <div className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[400px] animate-float-3d">
        <div data-tilt="12" className="tilt-3d w-full rounded-[2rem] p-1.5 bg-gradient-to-tr from-[#9B4F60] via-[#DFCCA4] to-[#D4AF37] shadow-2xl shadow-[#733140]/25">
          <div className="relative overflow-hidden rounded-[1.6rem] sheen">
            <img
              src={couple.heroImage}
              alt={`${couple.groomName} and ${couple.brideName} celebrating anniversary`}
              referrerPolicy="no-referrer"
              className="block w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 border border-[#E2CBA9]/60 shadow-md text-xs font-semibold text-[#733140] whitespace-nowrap">
            <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89]" />
            <span>Nazar na lage</span>
          </div>
        </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
        {/* Decorative Romantic Monogram / Kicker */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-xs font-medium tracking-widest uppercase text-[#9B4F60] mb-3" data-reveal>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Six-Month Milestone</span>
          <span aria-hidden="true">·</span>
          <span>12 April 2026 — 12 October 2026</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        {/* Clean Elegant Names */}
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide text-[#733140] mb-3 leading-tight drop-shadow-xs" data-reveal style={{ animationDelay: '100ms' }}>
          {couple.groomName} &amp; {couple.brideName}
        </h1>

        {/* Main Serif Luxury Heading */}
        <p className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl italic text-[#4A3E3D] font-medium tracking-wide mb-3 max-w-2xl text-balance" data-reveal style={{ animationDelay: '200ms' }}>
          Happy 6 Months, My Love
        </p>

        <p className="text-sm md:text-base text-[#4A3E3D]/80 max-w-xl mb-10 font-light" data-reveal style={{ animationDelay: '300ms' }}>
          {couple.heroSubtitle}
        </p>

        {/* Live Wedding Counter Glassmorphism Card */}
        <div className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#C47B89]/10 border border-[#E2CBA9]/40 mb-10" data-reveal style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-center gap-2 mb-5 text-xs tracking-wider uppercase font-semibold text-[#9B4F60]">
            <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89] animate-pulse" />
            <span>Time Since We Said "I Do"</span>
            <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89] animate-pulse" />
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
            {/* Days */}
            <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/60 border border-[#F4A6B8]/20 shadow-xs">
              <span className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140] tabular-nums">
                {elapsed.days}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-[#733140]/70 mt-1 font-medium">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/60 border border-[#F4A6B8]/20 shadow-xs">
              <span className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140] tabular-nums">
                {String(elapsed.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-[#733140]/70 mt-1 font-medium">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/60 border border-[#F4A6B8]/20 shadow-xs">
              <span className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140] tabular-nums">
                {String(elapsed.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-[#733140]/70 mt-1 font-medium">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/60 border border-[#F4A6B8]/20 shadow-xs">
              <span className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#C47B89] tabular-nums">
                {String(elapsed.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-[#733140]/70 mt-1 font-medium">
                Seconds
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2CBA9]/30 text-xs text-[#733140]/80 flex items-center justify-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Married on Sunday, April 12, 2026</span>
          </div>
        </div>

        {/* Scroll down trigger */}
        <button
          type="button"
          onClick={onExploreClick}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#9B4F60] hover:text-[#733140] transition-colors cursor-pointer"
          data-reveal
          style={{ animationDelay: '550ms' }}
        >
          <span>Read Our Love Story</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
      </div>
    </section>
  );
};
