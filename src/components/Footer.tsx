import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { CoupleProfile } from '../types';

interface FooterProps {
  couple: CoupleProfile;
  onOpenSurprise: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  couple,
  onOpenSurprise,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF6F0] border-t border-[#E2CBA9]/40 pt-16 pb-12 px-6 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center" data-reveal>
        {/* Gold Monogram Badge */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9B4F60] via-[#DFCCA4] to-[#D4AF37] p-0.5 shadow-lg flex items-center justify-center mb-6">
          <div className="w-full h-full rounded-full bg-[#FAF6F0] border border-[#D4AF37] flex flex-col items-center justify-center">
            <span className="font-serif-luxury text-sm font-bold tracking-wide whitespace-nowrap text-[#733140]">
              Mr &amp; Mrs
            </span>
          </div>
        </div>

        {/* Footer Quote */}
        <p className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#733140] mb-2 leading-tight">
          Forever starts with us 💕
        </p>

        <p className="font-serif-luxury text-lg sm:text-xl text-[#A37F4B] font-medium tracking-wide mb-6">
          {couple.groomName} &amp; {couple.brideName}
        </p>

        {/* Anniversary Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#733140]/70 mb-8 font-light">
          <span>Married: 12.04.2026</span>
          <span aria-hidden="true">·</span>
          <span>6 Months: 12.10.2026</span>
          <span aria-hidden="true">·</span>
          <span>Chapter 1: The Honeymoon of a Lifetime</span>
        </div>

        {/* Interactive action pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={onOpenSurprise}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#733140] bg-white hover:bg-[#FCE7EB] border border-[#E2CBA9]/60 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Anniversary Surprise</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#733140]/70 hover:text-[#733140] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>

        {/* Copyright / Quiet Note */}
        <div className="text-xs text-[#4A3E3D]/50 flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-center">
          <span>Crafted with endless love & devotion</span>
          <Heart className="w-3 h-3 fill-[#C47B89] text-[#C47B89]" />
          <span>for Mr. & Mrs.</span>
        </div>

        {/* Credit */}
        <p className="mt-3 text-[11px] tracking-widest uppercase text-[#A37F4B]/80">
          Designed &amp; built by <span className="font-semibold text-[#733140]">Naveed</span>
        </p>
      </div>
    </footer>
  );
};
