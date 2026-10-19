import React from 'react';
import { Sparkles, Music, VolumeX, Sliders } from 'lucide-react';

interface NavbarProps {
  onOpenSurprise: () => void;
  onOpenSettings: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSurprise,
  onOpenSettings,
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/85 backdrop-blur-md border-b border-[#E2CBA9]/30 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand title with credit line */}
        <a
          href="#hero"
          className="group flex flex-col leading-tight whitespace-nowrap shrink-0"
        >
          <span className="font-serif-luxury text-xl md:text-2xl font-semibold tracking-wide text-[#733140] group-hover:text-[#9B4F60] transition-colors">
            Mr. & Mrs.
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#A37F4B]/80">
            Designed &amp; built by <span className="font-semibold text-[#733140]">Naveed</span>
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A3E3D]">
          <a
            href="#story"
            className="hover:text-[#9B4F60] transition-colors whitespace-nowrap shrink-0"
          >
            Our Story
          </a>
          <a
            href="#gallery"
            className="hover:text-[#9B4F60] transition-colors whitespace-nowrap shrink-0"
          >
            Photo Gallery
          </a>
          <a
            href="#reasons"
            className="hover:text-[#9B4F60] transition-colors whitespace-nowrap shrink-0"
          >
            6 Reasons
          </a>
          <a
            href="#letter"
            className="hover:text-[#9B4F60] transition-colors whitespace-nowrap shrink-0"
          >
            Love Letter
          </a>
          <a
            href="#music"
            className="hover:text-[#9B4F60] transition-colors whitespace-nowrap shrink-0"
          >
            Our Song
          </a>
        </nav>

        {/* Zone 3: 1 primary action with quick ambient controls */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Pause our song' : 'Play our song'}
            className="p-2 text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
            aria-label="Play or pause our song"
          >
            {isMusicPlaying ? (
              <Music className="w-4 h-4 text-[#C47B89] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#A37F4B]" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            title="Personalize Memories"
            className="p-2 text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
            aria-label="Personalize couple details"
          >
            <Sliders className="w-4 h-4 text-[#A37F4B]" />
          </button>

          <button
            type="button"
            onClick={onOpenSurprise}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#C47B89] via-[#9B4F60] to-[#733140] rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2E8D5]" />
            <span>Surprise</span>
          </button>
        </div>
      </div>
    </header>
  );
};
