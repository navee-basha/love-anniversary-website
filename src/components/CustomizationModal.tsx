import React, { useState } from 'react';
import { X, Upload, Save, RotateCcw, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { CoupleProfile, GalleryPhoto, LoveLetterContent } from '../types';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  couple: CoupleProfile;
  photos: GalleryPhoto[];
  letter: LoveLetterContent;
  onSave: (updated: {
    couple: CoupleProfile;
    photos: GalleryPhoto[];
    letter: LoveLetterContent;
  }) => void;
  onReset: () => void;
  trailEnabled: boolean;
  onToggleTrail: () => void;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  couple,
  photos,
  letter,
  onSave,
  onReset,
  trailEnabled,
  onToggleTrail,
  petalsEnabled,
  onTogglePetals,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'details' | 'letter' | 'effects'>('photos');

  const [formCouple, setFormCouple] = useState<CoupleProfile>({ ...couple });
  const [formPhotos, setFormPhotos] = useState<GalleryPhoto[]>([...photos]);
  const [formLetter, setFormLetter] = useState<LoveLetterContent>({ ...letter });

  if (!isOpen) return null;

  const handlePhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const updated = [...formPhotos];
          updated[index] = {
            ...updated[index],
            photoUrl: event.target.result as string,
          };
          setFormPhotos(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onSave({
      couple: formCouple,
      photos: formPhotos,
      letter: formLetter,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-2xl w-full bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2CBA9]/60 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2CBA9]/40">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#9B4F60]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Personalize Memories</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#733140]">
              Anniversary Keepsake Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 py-3 border-b border-[#E2CBA9]/30 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-[#733140] text-white'
                : 'text-[#4A3E3D] hover:bg-[#FCE7EB]'
            }`}
          >
            Replace Photos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'bg-[#733140] text-white'
                : 'text-[#4A3E3D] hover:bg-[#FCE7EB]'
            }`}
          >
            Couple Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('letter')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'letter'
                ? 'bg-[#733140] text-white'
                : 'text-[#4A3E3D] hover:bg-[#FCE7EB]'
            }`}
          >
            Love Letter
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('effects')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'effects'
                ? 'bg-[#733140] text-white'
                : 'text-[#4A3E3D] hover:bg-[#FCE7EB]'
            }`}
          >
            Effects & Magic
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <p className="text-xs text-[#4A3E3D]/80">
                You can easily upload your real wedding and honeymoon photos from your phone or computer to replace any photo placeholder:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="p-3 bg-white rounded-xl border border-[#E2CBA9]/40 flex gap-3 items-center"
                  >
                    <img
                      src={photo.photoUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#733140] truncate">
                        {photo.title}
                      </p>
                      <label className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-1 text-[11px] font-medium bg-[#FAF5EE] hover:bg-[#FCE7EB] text-[#733140] rounded-md border border-[#E2CBA9]/50 cursor-pointer">
                        <Upload className="w-3 h-3 text-[#C47B89]" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoUpload(idx, e)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#733140] mb-1">Groom Name</label>
                <input
                  type="text"
                  value={formCouple.groomName}
                  onChange={(e) => setFormCouple({ ...formCouple, groomName: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2CBA9]/60 focus:outline-[#C47B89]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#733140] mb-1">Bride Name</label>
                <input
                  type="text"
                  value={formCouple.brideName}
                  onChange={(e) => setFormCouple({ ...formCouple, brideName: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2CBA9]/60 focus:outline-[#C47B89]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#733140] mb-1">Wedding Date</label>
                <input
                  type="date"
                  value={formCouple.weddingDate}
                  onChange={(e) => setFormCouple({ ...formCouple, weddingDate: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2CBA9]/60 focus:outline-[#C47B89]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#733140] mb-1">Hero Subtitle</label>
                <textarea
                  rows={2}
                  value={formCouple.heroSubtitle}
                  onChange={(e) => setFormCouple({ ...formCouple, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2CBA9]/60 focus:outline-[#C47B89]"
                />
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#733140] mb-1">Salutation</label>
                <input
                  type="text"
                  value={formLetter.salutation}
                  onChange={(e) => setFormLetter({ ...formLetter, salutation: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2CBA9]/60 focus:outline-[#C47B89]"
                />
              </div>
              {formLetter.paragraphs.map((p, pIdx) => (
                <div key={pIdx}>
                  <label className="block font-semibold text-[#733140] mb-1">Paragraph {pIdx + 1}</label>
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const updatedP = [...formLetter.paragraphs];
                      updatedP[pIdx] = e.target.value;
                      setFormLetter({ ...formLetter, paragraphs: updatedP });
                    }}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2CBA9]/60 focus:outline-[#C47B89]"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'effects' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E2CBA9]/40">
                <div>
                  <p className="font-semibold text-[#733140]">Heart Cursor Trail</p>
                  <p className="text-[#4A3E3D]/70 text-[11px]">Subtle floating hearts follow mouse pointer</p>
                </div>
                <button
                  type="button"
                  onClick={onToggleTrail}
                  className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                    trailEnabled ? 'bg-[#733140] text-white' : 'bg-[#E2CBA9]/40 text-[#4A3E3D]'
                  }`}
                >
                  {trailEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E2CBA9]/40">
                <div>
                  <p className="font-semibold text-[#733140]">Falling Rose Petals</p>
                  <p className="text-[#4A3E3D]/70 text-[11px]">Gentle blush rose petals drifting on background</p>
                </div>
                <button
                  type="button"
                  onClick={onTogglePetals}
                  className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                    petalsEnabled ? 'bg-[#733140] text-white' : 'bg-[#E2CBA9]/40 text-[#4A3E3D]'
                  }`}
                >
                  {petalsEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E2CBA9]/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs text-[#733140]/70 hover:text-[#733140] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#733140] hover:bg-[#FCE7EB] rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#C47B89] to-[#9B4F60] rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
