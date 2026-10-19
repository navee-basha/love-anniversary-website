import React, { useState, useEffect } from 'react';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, Plus, Sparkles, Heart } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  onAddOrEditPhotos: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onAddOrEditPhotos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % photos.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + photos.length) % photos.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

  const activePhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF6F0] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16" data-reveal>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#9B4F60] mb-2">
              <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Captured In Time</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140]">
              Our Memory Vault
            </h2>
            <p className="text-sm md:text-base text-[#4A3E3D]/80 font-light mt-2 max-w-xl">
              Polaroids of our cherished moments, preserved in gold and gentle laughter. Click any memory to open the view finder.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onAddOrEditPhotos}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#733140] bg-white hover:bg-[#FCE7EB] border border-[#E2CBA9]/60 rounded-full shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C47B89]" />
              <span>Replace / Add Real Photos</span>
            </button>
          </div>
        </div>

        {/* Polaroid Masonry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 sm:gap-10">
          {photos.map((item, idx) => {
            // Give subtle natural organic rotation tilts
            const rotationClasses = [
              '-rotate-1 hover:rotate-0',
              'rotate-1.5 hover:rotate-0',
              '-rotate-1.5 hover:rotate-0',
              'rotate-1 hover:rotate-0',
              '-rotate-2 hover:rotate-0',
              'rotate-2 hover:rotate-0',
            ];
            const rotation = rotationClasses[idx % rotationClasses.length];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`group cursor-pointer transition-transform duration-300 ease-out transform ${rotation}`}
                data-reveal
                style={{ animationDelay: `${(idx % 3) * 90}ms` }}
              >
                {/* Polaroid Frame */}
                <div data-tilt="10" className="tilt-3d bg-white p-2 pb-3 sm:p-4 sm:pb-6 rounded-lg polaroid-shadow border border-[#E2CBA9]/30 group-hover:shadow-2xl group-hover:-translate-y-1.5">
                  {/* Subtle Washi Tape Accent */}
                  <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-10 h-4 sm:w-16 sm:h-5 bg-[#E2CBA9]/40 backdrop-blur-xs border border-white/40 shadow-2xs rotate-1" />

                  {/* Photo container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#FAF6F0] mb-2 sm:mb-4">
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: item.focus ?? 'center 30%' }}
                      loading="lazy"
                      className="w-full h-full object-cover smooth-zoom img-fade-in"
                    />
                    <div className="absolute inset-0 bg-[#733140]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#733140] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-5 h-5 text-[#C47B89]" />
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="text-center px-0.5 sm:px-2">
                    <p className="font-handwritten text-base sm:text-2xl text-[#733140] leading-snug">
                      "{item.caption}"
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[9px] sm:text-[11px] text-[#A37F4B] mt-1 sm:mt-1.5 tracking-wider uppercase font-medium">
                      <span>{item.title}</span>
                      <span aria-hidden="true" className="hidden sm:inline">·</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-backdrop-in"
          onClick={() => setSelectedPhotoIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF6F0] rounded-2xl overflow-hidden shadow-2xl border border-[#E2CBA9]/50 flex flex-col md:flex-row animate-lightbox-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 text-white md:text-[#733140] bg-black/50 md:bg-white/80 hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={() =>
                setSelectedPhotoIndex(
                  (selectedPhotoIndex - 1 + photos.length) % photos.length
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#733140] shadow-md transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 md:right-[340px] z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#733140] shadow-md transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Main Lightbox Image */}
            <div className="flex-1 bg-black/90 flex items-center justify-center min-h-[300px] md:min-h-[480px]">
              <img
                key={activePhoto.id}
                src={activePhoto.photoUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain animate-lightbox-in"
              />
            </div>

            {/* Lightbox Side Details Panel */}
            <div className="w-full md:w-80 p-6 sm:p-8 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-[#E2CBA9]/30">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#9B4F60] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Memory {selectedPhotoIndex + 1} of {photos.length}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-[#733140] mb-3">
                  {activePhoto.title}
                </h3>

                <p className="font-handwritten text-xl text-[#4A3E3D] italic mb-4 leading-relaxed">
                  "{activePhoto.caption}"
                </p>

                <div className="space-y-1 text-xs text-[#733140]/70 pt-4 border-t border-[#E2CBA9]/30">
                  <p><strong className="text-[#733140]">Date:</strong> {activePhoto.date}</p>
                  <p><strong className="text-[#733140]">Category:</strong> {activePhoto.category}</p>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs text-[#9B4F60]">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-[#C47B89]" />
                  Forever Cherished
                </span>
                <span className="hidden sm:inline text-gray-400">Use ← → keys</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
