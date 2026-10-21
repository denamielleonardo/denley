import { Component, DestroyRef, inject } from '@angular/core';
import { WEDDING } from './wedding';

/**
 * Invisible background music. It tries to play the moment the page loads.
 * Browsers often refuse sound before the visitor interacts, so if that happens it keeps the track
 * running silently and un-mutes it on the first tap, click or key press (and again when the curtain opens).
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

    let audible = false;
    let failed = false; // audio file could not be loaded
    let fade: ReturnType<typeof setInterval> | undefined;

    const fadeIn = () => {
      clearInterval(fade);
      fade = setInterval(() => {
        audio.volume = Math.min(Music.VOLUME, audio.volume + 0.025);
        if (audio.volume >= Music.VOLUME) clearInterval(fade);
      }, 100);
    };

    const removeGestures = () => Music.GESTURES.forEach(g => window.removeEventListener(g, onGesture));

    /** Play with sound. Resolves true if the browser allowed it. */
    const playWithSound = (): Promise<boolean> => {
      audio.muted = false;
      audio.volume = 0;
      return audio.play().then(() => {
        audible = true;
        removeGestures();
        window.removeEventListener('curtain-open', onGesture);
        fadeIn();
        return true;
      }, () => false);
    };

    function onGesture(): void {
      if (failed || audible) return;
      void playWithSound();
    }

    // 1) try with sound right away; 2) if refused, run silently so it is ready to un-mute
    void playWithSound().then(ok => {
      if (ok || failed) return;
      audio.muted = true;
      audio.play().catch(() => undefined);
    });

    Music.GESTURES.forEach(g => window.addEventListener(g, onGesture, { passive: true }));
    window.addEventListener('curtain-open', onGesture);

    // Pause while the tab is in the background, resume when it comes back.
    const onVisibility = () => {
      if (failed) return;
      if (document.hidden) audio.pause(); else audio.play().catch(() => undefined);
    };
    document.addEventListener('visibilitychange', onVisibility);

    audio.addEventListener('error', () => { failed = true; removeGestures(); });

    inject(DestroyRef).onDestroy(() => {
      clearInterval(fade);
      removeGestures();
      window.removeEventListener('curtain-open', onGesture);
      document.removeEventListener('visibilitychange', onVisibility);
      audio.pause();
    });
  }
}
