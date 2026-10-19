import { Component, DestroyRef, inject } from '@angular/core';
import { WEDDING } from './wedding';

/**
 * Invisible background music. It starts the moment the curtain begins to open. Browsers block sound
 * until the visitor interacts with the page, so if that is refused it starts on the first tap, click or key press.
 * If the audio file is missing, it silently does nothing.
 */
@Component({ selector: 'app-music', template: '' })
export class Music {
  private static readonly VOLUME = 0.5;
  private static readonly GESTURES = ['pointerdown', 'touchend', 'click', 'keydown'] as const;

  constructor() {
    if (!WEDDING.music) return;

    const audio = new Audio(WEDDING.music);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;

    let wanted = true;   // false once the audio file fails to load
    let started = false;

    const fadeIn = () => {
      const id = setInterval(() => {
        audio.volume = Math.min(Music.VOLUME, audio.volume + 0.025);
        if (audio.volume >= Music.VOLUME) clearInterval(id);
      }, 100);
    };

    const start = () => {
      if (!wanted || started) return;
      audio.play().then(() => {
        started = true;
        removeGestures();
        fadeIn();
      }).catch(() => { /* still blocked: wait for the next gesture */ });
    };

    const removeGestures = () => Music.GESTURES.forEach(g => window.removeEventListener(g, start));
    Music.GESTURES.forEach(g => window.addEventListener(g, start, { passive: true }));

    // Pause while the tab is in the background, resume when it comes back.
    const onVisibility = () => {
      if (!started) return;
      if (document.hidden) audio.pause(); else audio.play().catch(() => undefined);
    };
    document.addEventListener('visibilitychange', onVisibility);

    audio.addEventListener('error', () => { wanted = false; removeGestures(); });
    window.addEventListener('curtain-open', start);

    inject(DestroyRef).onDestroy(() => {
      removeGestures();
      window.removeEventListener('curtain-open', start);
      document.removeEventListener('visibilitychange', onVisibility);
      audio.pause();
    });
  }
}
