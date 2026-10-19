import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Sun,
  Smile,
  Feather,
  Coffee,
  ShieldCheck,
  HeartHandshake,
  RotateCcw,
} from 'lucide-react';
import { LoveReason } from '../types';

interface SixReasonsProps {
  reasons: LoveReason[];
}

export const SixReasons: React.FC<SixReasonsProps> = ({ reasons }) => {
  // Track flipped state for each card
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (month: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const flipAll = (status: boolean) => {
    const newState: Record<number, boolean> = {};
    reasons.forEach((r) => {
      newState[r.month] = status;
    });
    setFlippedCards(newState);
  };

  const getIcon = (iconName: string) => {
    const iconProps = { className: 'w-7 h-7 text-[#C47B89]' };
    switch (iconName) {
      case 'Sun':
        return <Sun {...iconProps} />;
      case 'Smile':
        return <Smile {...iconProps} />;
      case 'Feather':
        return <Feather {...iconProps} />;
      case 'Coffee':
        return <Coffee {...iconProps} />;
      case 'ShieldCheck':
        return <ShieldCheck {...iconProps} />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake {...iconProps} />;
    }
  };

  return (
    <section id="reasons" className="py-24 px-6 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16" data-reveal>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#9B4F60] mb-2">
          <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89]" />
          <span>Half A Year Of Devotion</span>
          <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89]" />
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140] mb-3">
          6 Reasons I Love You
        </h2>
        <p className="text-sm md:text-base text-[#4A3E3D]/80 font-light mb-6">
          One special reason for every month we have shared together as husband and wife. Tap any card to unveil its secret.
        </p>

        {/* Quick flip controls */}
        <div className="inline-flex items-center gap-2 p-1 bg-white/70 backdrop-blur-md rounded-full border border-[#E2CBA9]/40 shadow-xs">
          <button
            type="button"
            onClick={() => flipAll(true)}
            className="px-3.5 py-1 text-xs font-medium text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
          >
            Reveal All
          </button>
          <span className="text-[#DFCCA4]" aria-hidden="true">|</span>
          <button
            type="button"
            onClick={() => flipAll(false)}
            className="px-3.5 py-1 text-xs font-medium text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* 6 Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {reasons.map((reason) => {
          const isFlipped = !!flippedCards[reason.month];

          return (
            <div
              key={reason.month}
              className="h-88 sm:h-96 perspective-1000 cursor-pointer group"
              data-reveal
              style={{ animationDelay: `${((reason.month - 1) % 3) * 100}ms` }}
              onClick={() => toggleFlip(reason.month)}
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 sm:p-8 glass-card border border-[#E2CBA9]/50 shadow-md group-hover:shadow-xl transition-shadow flex flex-col justify-between items-center text-center">
                  {/* Card top badge */}
                  <div className="w-full flex items-center justify-between text-xs font-medium text-[#9B4F60]">
                    <span className="font-serif-luxury font-bold tracking-widest text-[#A37F4B] uppercase">
                      {reason.monthLabel}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>

                  {/* Center Icon & Title */}
                  <div className="flex flex-col items-center">
                    <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#FCE7EB] border border-[#F4A6B8]/30 flex items-center justify-center mb-5 shadow-inner group-hover:scale-110 transition-transform">
                      {getIcon(reason.iconName)}
                    </div>
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#733140] mb-2">
                      {reason.title}
                    </h3>
                    <p className="font-handwritten text-lg text-[#9B4F60]">
                      "{reason.quote}"
                    </p>
                  </div>

                  {/* Tap prompt */}
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#A37F4B] font-medium tracking-wide">
                    <span>Tap to reveal reason</span>
                    <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#FFF9F5] via-[#FFF0F3] to-[#FAF5EE] border border-[#F4A6B8]/50 shadow-xl flex flex-col justify-between items-center text-center">
                  {/* Card top badge */}
                  <div className="w-full flex items-center justify-between text-xs font-medium text-[#9B4F60]">
                    <span className="font-serif-luxury font-bold tracking-widest text-[#733140]">
                      {reason.monthLabel} Reason
                    </span>
                    <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89]" />
                  </div>

                  {/* Back Content */}
                  <div className="my-auto py-2">
                    <h4 className="font-serif-luxury text-xl font-bold text-[#733140] mb-3">
                      {reason.title}
                    </h4>
                    <p className="text-sm text-[#4A3E3D] leading-relaxed font-light">
                      {reason.detail}
                    </p>
                  </div>

                  {/* Tap to flip back */}
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#9B4F60] font-medium">
                    <span>Tap to turn over</span>
                    <RotateCcw className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
