import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Volume2, VolumeX, Sparkles, Disc, Heart, RotateCcw } from 'lucide-react';

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onTogglePlay: () => void;
  brideName: string;
}

const formatTime = (secs: number) => {
  if (!Number.isFinite(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioRef,
  isPlaying,
  onTogglePlay,
  brideName,
}) => {
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDedication, setShowDedication] = useState(false);

  // Follow the shared audio element's real playback position
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncTime = () => setCurrentTime(audio.currentTime);
    const syncDuration = () => setDuration(audio.duration);

    audio.volume = volume;
    syncTime();
    syncDuration();
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('loadedmetadata', syncDuration);
    audio.addEventListener('durationchange', syncDuration);
    return () => {
      audio.removeEventListener('timeupdate', syncTime);
      audio.removeEventListener('loadedmetadata', syncDuration);
      audio.removeEventListener('durationchange', syncDuration);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef]);

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) audioRef.current.volume = newVol;
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="music" className="py-16 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14" data-reveal>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#9B4F60] mb-2">
          <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Soundtrack of Our Love</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140] mb-3">
          Our Song
        </h2>
        <p className="text-sm md:text-base text-[#4A3E3D]/80 font-light">
          The nasheed that carries the barakah of our Nikah. Press play and let it fill the room.
        </p>
      </div>

      {/* Vinyl & Player Card */}
      <div data-tilt="4" className="tilt-3d glass-card rounded-3xl p-5 sm:p-10 shadow-xl border border-[#E2CBA9]/50 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12" data-reveal="zoom">
        {/* Rotating Vinyl Record */}
        <div className="relative shrink-0">
          <div
            className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#1E1B18] via-[#2E282A] to-[#1E1B18] p-3 shadow-2xl flex items-center justify-center animate-spin"
            style={{ animationDuration: '6s', animationPlayState: isPlaying ? 'running' : 'paused' }}
          >
            {/* Vinyl Grooves */}
            <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full border border-white/10 flex items-center justify-center">
                {/* Vinyl Label */}
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#9B4F60] to-[#DFCCA4] p-0.5 shadow-md flex flex-col items-center justify-center text-center text-white">
                  <span className="font-serif-luxury text-[9px] sm:text-xs font-bold tracking-normal whitespace-nowrap text-[#FAF5EE]">
                    Mr &amp; Mrs
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#FAF5EE]/90">
                    Side A
                  </span>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/80 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative disc badge */}
          <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white/90 shadow-md border border-[#E2CBA9]/40 text-[#C47B89]">
            <Disc className="w-4 h-4" />
          </div>
        </div>

        {/* Player Controls & Info */}
        <div className="flex-1 w-full min-w-0 space-y-5">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9B4F60] inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Our Wedding Nasheed
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#733140] mt-0.5">
              Wedding Nasheed
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3E3D]/80 mt-0.5 font-light">
              Muhammad Al Muqit
            </p>
          </div>

          {/* Seekable Progress Bar */}
          <div className="space-y-1.5">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="song-seek w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #C47B89 0%, #DFCCA4 ${progress}%, rgba(226,203,169,0.35) ${progress}%)`,
              }}
              aria-label="Seek through the song"
            />
            <div className="flex items-center justify-between text-[11px] text-[#A37F4B] font-mono tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-1">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onTogglePlay}
                className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-tr from-[#9B4F60] to-[#C47B89] hover:from-[#733140] hover:to-[#9B4F60] text-white shadow-lg shadow-[#C47B89]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSeek(0)}
                className="p-2 rounded-full text-[#733140] hover:bg-[#FCE7EB] transition-colors cursor-pointer"
                aria-label="Restart song"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowDedication(!showDedication)}
                className="text-xs font-medium text-[#733140] hover:text-[#9B4F60] underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                {showDedication ? 'Hide Dedication' : 'Our Dedication'}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.7)}
                className="p-1 text-[#733140] hover:text-[#9B4F60] cursor-pointer"
                aria-label="Toggle mute"
              >
                {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20 sm:w-24 accent-[#C47B89] cursor-pointer"
                aria-label="Volume slider"
              />
            </div>
          </div>

          {/* Expandable Dedication */}
          {showDedication && (
            <div className="mt-4 pt-4 border-t border-[#E2CBA9]/30 text-center space-y-3">
              <p className="font-serif-luxury text-lg sm:text-xl text-[#733140] font-semibold leading-snug">
                Every time this nasheed plays, I am reminded of the blessing of our Nikah — and of how grateful I am that it was you.
              </p>
              <p className="font-handwritten text-xl text-[#9B4F60]">
                Har dua mein tera naam, har lamha tera saath.
              </p>
              <p className="text-xs font-medium text-[#A37F4B] pt-1 flex items-center justify-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89]" />
                <span>Dedicated with all my heart to {brideName} — Happy 6 Months</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
