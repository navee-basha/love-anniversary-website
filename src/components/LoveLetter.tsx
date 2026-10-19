import React, { useState } from 'react';
import { Mail, Sparkles, Heart, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';
import { LoveLetterContent } from '../types';

interface LoveLetterProps {
  letter: LoveLetterContent;
  onEditLetter: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ letter, onEditLetter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="letter" className="py-24 px-6 bg-gradient-to-b from-[#FAF6F0] via-[#FFF5F7] to-[#FAF6F0] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14" data-reveal>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#9B4F60] mb-2">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>A Message From The Heart</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140] mb-3">
            Sealed With A Promise
          </h2>
          <p className="text-sm md:text-base text-[#4A3E3D]/80 font-light">
            A handwritten love letter from Mr. to Mrs., sealed with our royal gold wax emblem. Tap the seal to open.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="flex flex-col items-center" data-reveal="zoom">
          {!isOpen ? (
            /* CLOSED ENVELOPE WITH WAX SEAL */
            <div
              onClick={() => setIsOpen(true)}
              className="group cursor-pointer w-full max-w-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative bg-[#F9ECEF] border-2 border-[#E2CBA9]/60 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-[#C47B89]/15 overflow-hidden flex flex-col items-center justify-center min-h-[340px]">
                {/* Envelope fold styling lines */}
                <div className="absolute inset-0 border-b-[170px] border-b-[#F4E1E6] border-x-[260px] border-x-transparent pointer-events-none opacity-80" />
                <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#F2D7DE] to-transparent opacity-40 pointer-events-none" />

                {/* Wax Seal Button in Center */}
                <div className="relative z-20 flex flex-col items-center group-hover:scale-105 transition-transform">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#9B4F60] via-[#C47B89] to-[#D4AF37] p-1 shadow-xl flex items-center justify-center animate-heart-beat">
                    <div className="w-full h-full rounded-full bg-[#733140] border-2 border-[#DFCCA4] flex flex-col items-center justify-center text-[#F9F5EE] shadow-inner">
                      <span className="font-serif-luxury text-sm font-bold tracking-wide whitespace-nowrap text-[#E2CBA9]">
                        Mr &amp; Mrs
                      </span>
                      <Heart className="w-3.5 h-3.5 fill-[#DFCCA4] text-[#DFCCA4] mt-0.5" />
                    </div>
                  </div>

                  <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#733140] group-hover:text-[#9B4F60] transition-colors flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full shadow-xs">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    Tap Wax Seal to Open
                  </span>
                </div>

                <div className="absolute bottom-4 text-center text-xs text-[#733140]/60 italic">
                  To Mrs. · For Our 6th Month Anniversary
                </div>
              </div>
            </div>
          ) : (
            /* OPENED LETTER DISPLAY */
            <div className="w-full max-w-2xl transition-all duration-700 ease-out transform scale-100">
              {/* Parchment Letter */}
              <div className="relative bg-[#FFFDF9] border border-[#DFCCA4] rounded-2xl p-6 sm:p-12 shadow-2xl shadow-[#C47B89]/20">
                {/* Date header with letter controls */}
                <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs font-medium text-[#A37F4B] tracking-wider">
                  {letter.date}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onEditLetter}
                    className="p-1.5 text-[#A37F4B] hover:text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
                    title="Edit letter wording"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1 text-xs text-[#733140] hover:text-[#9B4F60] font-medium px-2 py-1 bg-[#FAF5EE] rounded-lg border border-[#E2CBA9]/40 cursor-pointer"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    Close Letter
                  </button>
                </div>
                </div>

                {/* Salutation */}
                <h3 className="font-handwritten text-3xl sm:text-4xl text-[#733140] mb-6 font-semibold">
                  {letter.salutation}
                </h3>

                {/* Letter Body in handwritten style font */}
                <div className="space-y-4 font-serif-luxury text-lg sm:text-xl text-[#4A3E3D] leading-relaxed italic">
                  {letter.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-justify indent-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Closing and Signature */}
                <div className="mt-10 pt-6 border-t border-[#E2CBA9]/30 flex flex-col items-end">
                  <p className="font-handwritten text-2xl text-[#9B4F60] mb-1">
                    {letter.closing}
                  </p>
                  <p className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#733140] tracking-wide">
                    {letter.sender}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#A37F4B] mt-2">
                    <Heart className="w-3 h-3 fill-[#C47B89] text-[#C47B89]" />
                    <span>Husband & Lifelong Companion</span>
                  </div>
                </div>
              </div>

              {/* Fold back button at bottom */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#9B4F60] hover:text-[#733140] uppercase tracking-widest cursor-pointer"
                >
                  <span>Re-seal in Envelope</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
