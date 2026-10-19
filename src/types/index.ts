export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  photoUrl: string;
  location?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  photoUrl: string;
  date: string;
  category: string;
  focus?: string; // CSS object-position for the cropped thumbnail
}

export interface LoveReason {
  month: number;
  monthLabel: string;
  title: string;
  iconName: string;
  quote: string;
  detail: string;
}

export interface LoveLetterContent {
  salutation: string;
  paragraphs: string[];
  closing: string;
  sender: string;
  recipient: string;
  date: string;
}

export interface CoupleProfile {
  groomName: string;
  brideName: string;
  weddingDate: string; // ISO date or "2026-04-19"
  heroSubtitle: string;
  insideJokes: string;
  heroImage: string;
}
