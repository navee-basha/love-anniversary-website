import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoryTimeline } from './components/StoryTimeline';
import { PhotoGallery } from './components/PhotoGallery';
import { SixReasons } from './components/SixReasons';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { SurpriseModal } from './components/SurpriseModal';
import { Footer } from './components/Footer';
import { HeartCursorTrail } from './components/HeartCursorTrail';
import { FallingPetals } from './components/FallingPetals';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomizationModal } from './components/CustomizationModal';

import {
  DEFAULT_COUPLE,
  DEFAULT_MILESTONES,
  DEFAULT_GALLERY,
  DEFAULT_REASONS,
  DEFAULT_LOVE_LETTER,
} from './data/defaultContent';
import { CoupleProfile, GalleryPhoto, LoveLetterContent } from './types';
import weddingNasheed from './assets/audio/wedding_nasheed.mp3';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Couple Profile State with localStorage persistence and Indian theme versioning
  const [couple, setCouple] = useState<CoupleProfile>(() => {
    try {
      const ver = localStorage.getItem('anniversary_theme_ver');
      if (ver !== 'demo_v6') {
        localStorage.setItem('anniversary_theme_ver', 'demo_v6');
        localStorage.setItem('anniversary_couple', JSON.stringify(DEFAULT_COUPLE));
        localStorage.setItem('anniversary_gallery', JSON.stringify(DEFAULT_GALLERY));
        localStorage.setItem('anniversary_letter', JSON.stringify(DEFAULT_LOVE_LETTER));
        return DEFAULT_COUPLE;
      }
      const saved = localStorage.getItem('anniversary_couple');
      if (saved) {
        const parsed: CoupleProfile = JSON.parse(saved);
        return {
          ...parsed,
          groomName: parsed.groomName || DEFAULT_COUPLE.groomName,
          brideName: parsed.brideName || DEFAULT_COUPLE.brideName,
        };
      }
      return DEFAULT_COUPLE;
    } catch {
      return DEFAULT_COUPLE;
    }
  });

  // Photo Gallery State
  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    try {
      const ver = localStorage.getItem('anniversary_theme_ver');
      if (ver !== 'demo_v6') {
        return DEFAULT_GALLERY;
      }
      const saved = localStorage.getItem('anniversary_gallery');
      return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
    } catch {
      return DEFAULT_GALLERY;
    }
  });

  // Love Letter State
  const [letter, setLetter] = useState<LoveLetterContent>(() => {
    try {
      const ver = localStorage.getItem('anniversary_theme_ver');
      if (ver !== 'demo_v6') {
        return DEFAULT_LOVE_LETTER;
      }
      const saved = localStorage.getItem('anniversary_letter');
      if (saved) {
        const parsed: LoveLetterContent = JSON.parse(saved);
        return {
          ...parsed,
          sender: parsed.sender || DEFAULT_LOVE_LETTER.sender,
          recipient: parsed.recipient || DEFAULT_LOVE_LETTER.recipient,
        };
      }
      return DEFAULT_LOVE_LETTER;
    } catch {
      return DEFAULT_LOVE_LETTER;
    }
  });

  // Interactive UI states
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Visual effects toggles
  const [cursorTrailEnabled, setCursorTrailEnabled] = useState(true);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  // Save changes to localStorage
  const handleSaveCustomization = (updated: {
    couple: CoupleProfile;
    photos: GalleryPhoto[];
    letter: LoveLetterContent;
  }) => {
    setCouple(updated.couple);
    setGallery(updated.photos);
    setLetter(updated.letter);

    try {
      localStorage.setItem('anniversary_couple', JSON.stringify(updated.couple));
      localStorage.setItem('anniversary_gallery', JSON.stringify(updated.photos));
      localStorage.setItem('anniversary_letter', JSON.stringify(updated.letter));
    } catch {
      // LocalStorage quota handling
    }
  };

  const handleResetDefaults = () => {
    setCouple(DEFAULT_COUPLE);
    setGallery(DEFAULT_GALLERY);
    setLetter(DEFAULT_LOVE_LETTER);
    try {
      localStorage.removeItem('anniversary_couple');
      localStorage.removeItem('anniversary_gallery');
      localStorage.removeItem('anniversary_letter');
    } catch {
      // Ignore
    }
  };

  // Scroll reveal: elements with data-reveal animate in once they enter the viewport.
  // Starts after the loading screen so the hero entrance is actually seen.
  useEffect(() => {
    document.documentElement.classList.add('reveal-ready');
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const observeAll = () =>
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
    observeAll();
    // Pick up elements rendered later (e.g. gallery edits, opened letter)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [isLoading]);

  // 3D tilt: elements with data-tilt="<max degrees>" lean toward the mouse pointer.
  // Delegated on the document so gallery items added later also tilt. Mouse devices only.
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduceMotion) return;

    let active: HTMLElement | null = null;
    let frame = 0;

    const reset = (el: HTMLElement) => {
      el.classList.remove('is-tilting');
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
      el.style.removeProperty('--ts');
    };

    const handleMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const max = Number(el.dataset.tilt) || 8;
        el.classList.add('is-tilting');
        el.style.setProperty('--ry', `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
        el.style.setProperty('--ts', '1.02');
        el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
      });
    };

    const handleLeave = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener('pointermove', handleMove);
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  // Toggle our song (shared by the navbar button and the music player)
  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setIsMusicPlaying(false));
    } else {
      audio.pause();
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] text-[#4A3E3D] selection:bg-[#F4A6B8] selection:text-white">
      {/* Our Song — one shared audio element for the whole page */}
      <audio
        ref={audioRef}
        src={weddingNasheed}
        preload="metadata"
        loop
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Floating Petals Canvas */}
      <FallingPetals active={petalsEnabled} />

      {/* Heart Cursor Trail (Desktop) */}
      <HeartCursorTrail enabled={cursorTrailEnabled} />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenSurprise={() => setIsSurpriseOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero couple={couple} onExploreClick={scrollToStory} />

        {/* 2. Our Story Timeline */}
        <StoryTimeline milestones={DEFAULT_MILESTONES} />

        {/* 3. Photo Gallery */}
        <PhotoGallery
          photos={gallery}
          onAddOrEditPhotos={() => setIsSettingsOpen(true)}
        />

        {/* 4. 6 Reasons I Love You */}
        <SixReasons reasons={DEFAULT_REASONS} />

        {/* 5. Love Letter */}
        <LoveLetter
          letter={letter}
          onEditLetter={() => setIsSettingsOpen(true)}
        />

        {/* 6. Our Song (Music Player) */}
        <MusicPlayer
          audioRef={audioRef}
          isPlaying={isMusicPlaying}
          onTogglePlay={handleToggleMusic}
          brideName={couple.brideName}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        couple={couple}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
      />

      {/* 7. Surprise Modal */}
      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        groomName={couple.groomName}
        brideName={couple.brideName}
      />

      {/* Personalization / Settings Modal */}
      <CustomizationModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        couple={couple}
        photos={gallery}
        letter={letter}
        onSave={handleSaveCustomization}
        onReset={handleResetDefaults}
        trailEnabled={cursorTrailEnabled}
        onToggleTrail={() => setCursorTrailEnabled(!cursorTrailEnabled)}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
      />
    </div>
  );
}
