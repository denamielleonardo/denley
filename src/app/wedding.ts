/**
 * Everything you'll want to edit lives here.
 * Swap photos by dropping files in public/images/gallery and updating `gallery` below.
 */
export const WEDDING = {
  bride: 'Shirley',
  groom: 'Den',
  brideFirst: 'Shirley',
  groomFirst: 'Den',

  // Philippine time (UTC+8). Change the offset if the venue is elsewhere.
  startISO: '2027-10-08T16:00:00+08:00',
  endISO: '2027-10-08T22:00:00+08:00',
  timeZone: 'Asia/Manila',

  venue: 'Casa Beatriz Events and Resort Place',
  address: '', // e.g. 'Brgy. Example, City, Province' (shown under the venue name when filled)
  mapQuery: 'Casa Beatriz Events and Resort Place',


  invitation:
    'Together with our families, we joyfully invite you to celebrate the beginning of our forever.',

  // Leave empty until you have one. A link (Google Form, Messenger, etc.) shows an RSVP button.
  rsvpUrl: '',
  rsvpNote: 'Kindly let us know if you can make it. Details coming soon.',

  // Hero / section photos. Placeholders from picsum.photos: swap for your own (e.g. 'images/us.jpg').
  photos: {
    hero: 'https://picsum.photos/id/69/1920/1280',
    arch: 'https://picsum.photos/id/64/900/1200',
  },

  // Gallery: swap src for your own files in public/images/gallery. size: tall | wide | sq controls the mosaic.
  gallery: [
    { src: 'https://picsum.photos/id/65/800/1200', alt: 'Photo 1', size: 'tall' },
    { src: 'https://picsum.photos/id/17/1200/800', alt: 'Photo 2', size: 'wide' },
    { src: 'https://picsum.photos/id/25/900/900', alt: 'Photo 3', size: 'sq' },
    { src: 'https://picsum.photos/id/28/900/900', alt: 'Photo 4', size: 'sq' },
    { src: 'https://picsum.photos/id/64/800/1200', alt: 'Photo 5', size: 'tall' },
    { src: 'https://picsum.photos/id/78/900/900', alt: 'Photo 6', size: 'sq' },
    { src: 'https://picsum.photos/id/69/1200/800', alt: 'Photo 7', size: 'wide' },
    { src: 'https://picsum.photos/id/18/900/900', alt: 'Photo 8', size: 'sq' },
    { src: 'https://picsum.photos/id/77/900/900', alt: 'Photo 9', size: 'sq' },
    { src: 'https://picsum.photos/id/29/1200/800', alt: 'Photo 10', size: 'wide' },
  ] as { src: string; alt: string; size: 'tall' | 'wide' | 'sq' }[],

  // Video: a YouTube link (https://youtu.be/...) or a file in public/videos (e.g. 'videos/our-story.mp4').
  // Leave empty to show the placeholder.
  videoUrl: '',
  videoPoster: 'https://picsum.photos/id/65/1280/720',
};
