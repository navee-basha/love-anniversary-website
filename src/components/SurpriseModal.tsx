import React, { useEffect } from 'react';
import { Gift, Heart, Sparkles, X, Award, RotateCcw } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confettiHearts';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  groomName,
  brideName,
}) => {
  useEffect(() => {
    if (isOpen) {
      fireHeartConfetti();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#D4AF37] text-center overflow-hidden animate-soft-float"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
          aria-label="Close surprise message"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative corner flourishes */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37] m-3 pointer-events-none rounded-tl-xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37] m-3 pointer-events-none rounded-br-xl" />

        {/* Surprise Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#FCE7EB] via-[#F4A6B8] to-[#DFCCA4] p-1 shadow-lg flex items-center justify-center mb-6 animate-heart-beat">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <Gift className="w-8 h-8 text-[#9B4F60]" />
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-2">
          <Award className="w-4 h-4" />
          <span>Certificate of Eternal Love</span>
        </div>

        <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#733140] mb-3">
          Happy 6-Month Anniversary!
        </h3>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" />

        {/* Certificate Message */}
        <div className="space-y-4 text-[#4A3E3D] font-light leading-relaxed mb-8">
          <p className="font-serif-luxury text-xl italic text-[#733140] font-medium">
            "MashaAllah · Rab Ne Bana Di Jodi 💕"
          </p>
          <p className="text-sm">
            Dil se mubarakbaad to{' '}
            <strong className="text-[#733140] font-semibold">{groomName}</strong> and{' '}
            <strong className="text-[#733140] font-semibold">{brideName}</strong> on completing six beautiful months of marriage!
          </p>
          <p className="text-sm">
            Celebrating every cup of evening masala chai, every shared prayer, and the sacred vows of Nikah made on 12th April 2026.
          </p>
          <p className="font-serif-luxury text-base text-[#9B4F60] font-semibold italic">
            "Nit khair manga soniya main teri, dua na koi hor mangdi..."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fireHeartConfetti()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C47B89] to-[#9B4F60] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#F2E8D5]" />
            <span>More Hearts & Confetti!</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FAF5EE] text-[#733140] hover:bg-[#FCE7EB] text-xs font-semibold rounded-full border border-[#E2CBA9]/60 transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89]" />
            <span>I Love You Forever</span>
          </button>
        </div>
      </div>
    </div>
  );
};
