/**
 * Everything you'll want to edit lives here.
 * Swap photos by dropping files in public/images/gallery and updating `gallery` below.
 */
export const WEDDING = {
  bride: 'Shirley Aragona',
  groom: 'Den Amiel Leonardo',
  brideFirst: 'Shirley',
  groomFirst: 'Den Amiel',

  // Philippine time (UTC+8). Change the offset if the venue is elsewhere.
  startISO: '2026-10-08T16:00:00+08:00',
  endISO: '2026-10-08T22:00:00+08:00',
  timeZone: 'Asia/Manila',

  venue: 'Casa Beatriz Events and Resort Place',
  address: '', // e.g. 'Brgy. Example, City, Province' (shown under the venue name when filled)
  mapQuery: 'Casa Beatriz Events and Resort Place',

  theme: 'Rustic',
  themeBlurb:
    'Warm wood, wildflowers, twinkling lights and good company. Come as you are, dressed in the earthy tones of the countryside.',
  dressCode: 'Earth tones: sage, terracotta, cream, dusty brown & soft gold.',
  palette: [
    { name: 'Sage', hex: '#7d8b6a' },
    { name: 'Terracotta', hex: '#b5654a' },
    { name: 'Cream', hex: '#f1e6d0' },
    { name: 'Walnut', hex: '#6b4a35' },
    { name: 'Gold', hex: '#b8934a' },
  ],

  invitation:
    'Together with our families, we joyfully invite you to celebrate the beginning of our forever.',

  // Leave empty until you have one. A link (Google Form, Messenger, etc.) shows an RSVP button.
  rsvpUrl: '',
  rsvpNote: 'Kindly let us know if you can make it. Details coming soon.',

  // Photos: add your own files to public/images/gallery and list them here.
  gallery: [
    { src: 'images/gallery/photo-1.svg', alt: 'Placeholder photo 1' },
    { src: 'images/gallery/photo-2.svg', alt: 'Placeholder photo 2' },
    { src: 'images/gallery/photo-3.svg', alt: 'Placeholder photo 3' },
    { src: 'images/gallery/photo-4.svg', alt: 'Placeholder photo 4' },
    { src: 'images/gallery/photo-5.svg', alt: 'Placeholder photo 5' },
    { src: 'images/gallery/photo-6.svg', alt: 'Placeholder photo 6' },
    { src: 'images/gallery/photo-7.svg', alt: 'Placeholder photo 7' },
    { src: 'images/gallery/photo-8.svg', alt: 'Placeholder photo 8' },
  ],

  // Video: a YouTube link (https://youtu.be/...) or a file in public/videos (e.g. 'videos/our-story.mp4').
  // Leave empty to show the placeholder.
  videoUrl: '',
  videoPoster: 'images/video-poster.svg',
};
