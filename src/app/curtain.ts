import { Component, DestroyRef, inject, signal } from '@angular/core';
import { WEDDING } from './wedding';

/** Full-screen velvet curtain intro. Opens by itself after a short pause; a click/tap skips the wait. */
@Component({
  selector: 'app-curtain',
  template: `
    @if (state() !== 'gone') {
      <div class="curtain" [class.opening]="state() === 'opening'" role="dialog" aria-modal="true"
           aria-label="Wedding invitation" (click)="open()">
        <div class="stage">
          <div class="drape left"></div>
          <div class="drape right"></div>
          <div class="pelmet"></div>
          <div class="rope left"></div>
          <div class="rope right"></div>
          <div class="c-center">
            <p class="c-eyebrow">You are invited!</p>
            <p class="c-mono">D<em>&amp;</em>S</p>
            <p class="c-names">{{ w.brideFirst }} &amp; {{ w.groomFirst }}</p>
          </div>
        </div>
      </div>
    }
  `,
})
export class Curtain {
  protected readonly w = WEDDING;
  protected readonly state = signal<'closed' | 'opening' | 'gone'>('closed');
  private timer?: ReturnType<typeof setTimeout>;
  private autoTimer?: ReturnType<typeof setTimeout>;
  /** Pause before the curtain opens on its own (ms). */
  private static readonly DELAY = 1000;

  constructor() {
    document.body.classList.add('curtain-lock');
    this.autoTimer = setTimeout(() => this.open(), Curtain.DELAY);
    inject(DestroyRef).onDestroy(() => { clearTimeout(this.timer); clearTimeout(this.autoTimer); });
  }

  protected open(): void {
    if (this.state() !== 'closed') return;
    clearTimeout(this.autoTimer);
    this.state.set('opening');
    document.body.classList.add('opened');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.timer = setTimeout(() => {
      this.state.set('gone');
      document.body.classList.remove('curtain-lock');
    }, reduced ? 100 : 2600);
  }
}
