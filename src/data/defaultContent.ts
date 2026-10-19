import { CoupleProfile, GalleryPhoto, LoveLetterContent, LoveReason, Milestone } from '../types';

import bouquetEmbraceImg from '../assets/images/bouquet_embrace.jpg';
import carHandHoldImg from '../assets/images/car_hand_hold.jpg';
import dulhaDulhanRingImg from '../assets/images/dulha_dulhan_ring.jpg';
import haathMeinHaathImg from '../assets/images/haath_mein_haath.jpg';
import handInHairImg from '../assets/images/hand_in_hair.jpg';
import mehndiOnSherwaniImg from '../assets/images/mehndi_on_sherwani.jpg';
import nikahCeremonyImg from '../assets/images/nikah_ceremony.jpg';
import nikahnamaSignImg from '../assets/images/nikahnama_sign.jpg';
import payalMomentImg from '../assets/images/payal_moment.jpg';
import prayingTogetherImg from '../assets/images/praying_together.jpg';
import walkingHandInHandImg from '../assets/images/walking_hand_in_hand.jpg';
import whiteRoseImg from '../assets/images/white_rose.jpg';

export const DEFAULT_COUPLE: CoupleProfile = {
  groomName: 'Mr.',
  brideName: 'Mrs.',
  weddingDate: '2026-04-12',
  heroSubtitle: 'Chhe mahine ka suhaana safar — Har dua mein tera naam, har lamha tera saath.',
  insideJokes: 'Late night chai sessions, biryani dates, movie nights & "Nazar na lage" glances 💕',
  heroImage: prayingTogetherImg,
};

export const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    title: 'Shahi Nikah — Qubool Hai',
    subtitle: 'Our Holy Wedding Day (12th April 2026)',
    date: '12 April 2026',
    location: 'Surrounded by Loved Ones & Duas',
    description: 'The sacred moment we uttered "Qubool Hai". You sat in your red bridal dupatta, I waited behind the curtain of mogra and roses, and our elders showered us with heartfelt prayers.',
    photoUrl: nikahCeremonyImg,
  },
  {
    id: 'm-2',
    title: 'Mehndi Wale Haath',
    subtitle: 'The First Day of Forever',
    date: '13 April 2026',
    location: 'Hand in Hand, Heart to Heart',
    description: 'The very next day, your mehndi-painted hands held on to my arm, the haath-phool glinting on your fingers. In that small quiet moment I knew — this hand I will never let go.',
    photoUrl: mehndiOnSherwaniImg,
  },
  {
    id: 'm-3',
    title: 'Naye Ghar Ka Sukoon',
    subtitle: 'Where I Found My Rest — In Your Hands',
    date: '17 April 2026',
    location: 'Our Little Home',
    description: 'After a long tiring day, my head on the table and your mehndi hand running through my hair. Our home felt complete from that very first week.',
    photoUrl: handInHairImg,
  },
  {
    id: 'm-4',
    title: 'Pehla Safar Saath',
    subtitle: 'Long Drives & Endless Roads',
    date: '25 April 2026',
    location: 'Just the Two of Us & the Open Road',
    description: 'Our first trip together — one hand on the steering, the other holding yours, your gajra resting on my wrist. Every view was beautiful, but I kept looking at you.',
    photoUrl: carHandHoldImg,
  },
  {
    id: 'm-5',
    title: 'Roshni Ki Raah',
    subtitle: 'Holding Hands Through History',
    date: '14 June 2026',
    location: 'Ancient Arches & Lantern-Lit Paths',
    description: 'Among old stone arches and glowing lanterns, I walked a step ahead — but never once let go of your hand. Saying nothing and feeling everything.',
    photoUrl: walkingHandInHandImg,
  },
  {
    id: 'm-6',
    title: 'Chhe Mahine Ka Pyar',
    subtitle: '6 Months of Pure Blessings & Togetherness',
    date: '12 October 2026',
    location: 'Our Sweet Little Jashn',
    description: '183 days of shared laughter, biryani dates, movie nights, long drives and quiet evenings — and thanking the Almighty every single day for blessing me with the best life partner.',
    photoUrl: bouquetEmbraceImg,
  },
];

export const DEFAULT_GALLERY: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'Shahi Nikah Mubarak',
    caption: '12.04.2026 — Phoolon ka parda, aur do dil ek jaan ban gaye.',
    photoUrl: nikahCeremonyImg,
    date: '12 April 2026',
    category: 'Wedding',
  },
  {
    id: 'g-2',
    title: 'Nikahnama',
    caption: 'Ek dastakhat, aur zindagi bhar ka waada.',
    photoUrl: nikahnamaSignImg,
    date: '12 April 2026',
    category: 'Wedding',
  },
  {
    id: 'g-3',
    title: 'Dulha & Dulhan',
    caption: 'Laal dupatta, ungli mein nayi angoothi, aur mere bagal mein tum.',
    photoUrl: dulhaDulhanRingImg,
    date: '12 April 2026',
    category: 'Wedding',
  },
  {
    id: 'g-4',
    title: 'Saath Saath',
    caption: 'Hari choodiyan, mehndi wale haath, aur mera haath unke upar.',
    photoUrl: haathMeinHaathImg,
    date: '12 April 2026',
    category: 'Wedding',
  },
  {
    id: 'g-5',
    title: 'Haath Thaam Ke',
    caption: 'Ek qadam aage chala, par tumhara haath kabhi nahi chhoda.',
    photoUrl: walkingHandInHandImg,
    date: '12 April 2026',
    category: 'Wedding',
  },
  {
    id: 'g-6',
    title: 'Mehndi Wale Haath',
    caption: 'Mehndi ka rang gehra, aur tumhare haath mere baazu par.',
    photoUrl: mehndiOnSherwaniImg,
    date: '13 April 2026',
    category: 'Details',
  },
  {
    id: 'g-7',
    title: 'Sukoon Ka Sahara',
    caption: 'Tumhari ungliyan mere baalon mein, aur saari thakan gayab.',
    photoUrl: handInHairImg,
    date: '17 April 2026',
    category: 'Home',
  },
  {
    id: 'g-8',
    title: 'Pehla Safar',
    caption: 'Ek haath steering pe, doosra hamesha tumhare haath mein.',
    photoUrl: carHandHoldImg,
    date: '25 April 2026',
    category: 'Travel',
  },
  {
    id: 'g-9',
    title: 'Payal Ki Chhan Chhan',
    caption: 'Tumhari payal ki aawaz, mere ghar ki sabse pyari dhun.',
    photoUrl: payalMomentImg,
    date: '21 May 2026',
    category: 'Details',
  },
  {
    id: 'g-10',
    title: 'Safed Gulaab',
    caption: 'Ek gulaab diya, badle mein tumhari muskaan mil gayi.',
    photoUrl: whiteRoseImg,
    date: '29 August 2026',
    category: 'Dates',
  },
  {
    id: 'g-11',
    title: 'Saath Ki Dua',
    caption: 'Ek hi qibla, ek hi dua — hamesha saath.',
    photoUrl: prayingTogetherImg,
    date: '2026',
    category: 'Faith',
  },
  {
    id: 'g-12',
    title: 'Nit Khair Manga',
    caption: 'Chhe mahine beet gaye, par lagta hai kal hi ki baat hai.',
    photoUrl: bouquetEmbraceImg,
    date: '12 October 2026',
    category: 'Today',
  },
];

export const DEFAULT_REASONS: LoveReason[] = [
  {
    month: 1,
    monthLabel: 'Month 1',
    title: 'Tumhara Noor (Your Radiant Grace)',
    iconName: 'Sun',
    quote: 'Ghar ko jannat banane wali roshni.',
    detail: 'From the very first morning of our marriage, your gentle warmth, respectful nature, and glowing smile turned our home into a serene sanctuary filled with barakah.',
  },
  {
    month: 2,
    monthLabel: 'Month 2',
    title: 'Tumhari Pyari Muskaan (Your Laughter)',
    iconName: 'Smile',
    quote: 'Mera sabse pasandeeda sukoon.',
    detail: 'The way your eyes crinkle when you laugh at my silly jokes. Seeing you smile effortlessly is my favorite reward at the end of every tiring day.',
  },
  {
    month: 3,
    monthLabel: 'Month 3',
    title: 'Tumhara Sabr (Your Calm & Wisdom)',
    iconName: 'Feather',
    quote: 'Har toofan mein mera thikana.',
    detail: 'Your patience, understanding, and emotional maturity. Whenever life gets overwhelming, your comforting words and calming touch restore all peace in my heart.',
  },
  {
    month: 4,
    monthLabel: 'Month 4',
    title: 'Shaam Ki Chai & Baatein (Our Rituals)',
    iconName: 'Coffee',
    quote: 'Chhoti chhoti meethi baatein jo sabse khaas hain.',
    detail: 'Sitting together every evening over steaming cups of chai, sharing our days, our dreams, and those quiet glances that speak louder than words.',
  },
  {
    month: 5,
    monthLabel: 'Month 5',
    title: 'Tumhari Duayein (Your Pure Prayers)',
    iconName: 'ShieldCheck',
    quote: 'Rab ne bana di humari jodi.',
    detail: 'Knowing that you always pray for my success and well-being before your own. Your pure dua is the shield and strength of my life.',
  },
  {
    month: 6,
    monthLabel: 'Month 6',
    title: 'Har Lamha Tere Saath (Forever In Love)',
    iconName: 'HeartHandshake',
    quote: 'Nit khair manga soniya main teri.',
    detail: 'These six months have shown me that marrying you was the best blessing Almighty ever bestowed upon me. With each sunrise, my love for you only multiplies.',
  },
];

export const DEFAULT_LOVE_LETTER: LoveLetterContent = {
  salutation: 'Meri Pyaari Begum,',
  paragraphs: [
    'Aisa lagta hai jaise kal hi ki baat ho jab 12 April 2026 ko hum dono ne apne azeez rishtedaaron aur buzurgon ki duaon ke saaye mein apna Nikah qubool kiya tha. Us din gulaab ki pankhudiyon ke beech tumhara noorani chehra dekh kar mera dil shukar se bhar gaya tha.',
    'In chhe mahino mein tumne meri zindagi ko sukoon, mohabbat aur barakah se bhar diya hai. Tum meri sabse achhi dost ho, meri sabse badi taaqat ho, aur meri har dua ka sabse khoobsurat jawaab ho.',
    'Har shaam tumhare haath ki bani chai peena, tumhari pyari baatein sunna, aur tumhari muskaan dekhna meri zindagi ki sabse badi daulat ban chuki hai. Tumne hamare ghar ko sach mein ek jannat bana diya hai.',
    'Aaj humari shadi ke chhe mahine poore hone par main bas yahi dua karta hoon: "Nit khair manga soniya main teri, dua na koi hor mangdi." Khuda humari jodi ko hamesha salamat rakhe aur humara yeh saath ta-umr yuhi muskurata rahe.',
  ],
  closing: 'Hamesha aur sirf tumhara,',
  sender: 'Mr.',
  recipient: 'Mrs.',
  date: '12 October 2026',
};
