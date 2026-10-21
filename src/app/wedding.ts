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


  invitationTitle: "It’s finally happening!",
  invitation:
    "We're getting married, and it wouldn't be the same without the people who mean the most to us.",

  // Leave empty until you have one. A link (Google Form, Messenger, etc.) shows an RSVP button.
  rsvpUrl: '',
  rsvpNote: 'Kindly let us know if you can make it. Details coming soon.',

  // Hero / section photos: your own files live in public/images/photos.
  photos: {
    hero: 'images/photos/photo-06.jpg',
    arch: 'images/photos/ring.jpg',
  },

  // Gallery: one frame that fades through every item in this list, in order, forever.
  // Photos go in public/images/photos, videos in public/videos (mark them video: true; they play muted to the end).
  // Clicking the frame opens a full-screen viewer.
  gallery: [
    { src: 'images/photos/photo-08.jpg', alt: 'Shirley and Den, photo 1' },
    { src: 'images/photos/photo-06.jpg', alt: 'Shirley and Den, photo 2' },
    { src: 'videos/clip-1.mp4', alt: 'Shirley and Den, video 1', video: true },
    { src: 'images/photos/photo-01.jpg', alt: 'Shirley and Den, photo 3' },
    { src: 'images/photos/photo-05.jpg', alt: 'Shirley and Den, photo 4' },
    { src: 'images/photos/photo-07.jpg', alt: 'Shirley and Den, photo 5' },
    { src: 'videos/clip-2.mp4', alt: 'Shirley and Den, video 2', video: true },
    { src: 'images/photos/photo-02.jpg', alt: 'Shirley and Den, photo 6' },
    { src: 'images/photos/photo-10.jpg', alt: 'Shirley and Den, photo 7' },
    { src: 'videos/clip-3.mp4', alt: 'Shirley and Den, video 3', video: true },
    { src: 'images/photos/photo-12.jpg', alt: 'Shirley and Den, photo 8' },
    { src: 'images/photos/photo-13.jpg', alt: 'Shirley and Den, photo 9' },
    { src: 'images/photos/photo-11.jpg', alt: 'Shirley and Den, photo 10' },
    { src: 'videos/clip-4.mp4', alt: 'Shirley and Den, video 4', video: true },
    { src: 'images/photos/photo-03.jpg', alt: 'Shirley and Den, photo 11' },
    { src: 'images/photos/photo-14.jpg', alt: 'Shirley and Den, photo 12' },
    { src: 'images/photos/photo-04.jpg', alt: 'Shirley and Den, photo 13' },
    { src: 'videos/clip-5.mp4', alt: 'Shirley and Den, video 5', video: true },
    { src: 'images/photos/photo-15.jpg', alt: 'Shirley and Den, photo 14' },
  ] as { src: string; alt: string; video?: boolean }[],

  // Background music (no player is shown). Put the file in public/audio and set its path here; '' turns it off.
  music: 'audio/music.mp3',

  // Video: a YouTube link (https://youtu.be/...) or a file in public/videos (e.g. 'videos/our-story.mp4').
  // Leave empty to show the placeholder.
  videoUrl: '',
  videoPoster: 'images/photos/photo-06.jpg',
};
