import { Component, DestroyRef, inject, signal } from '@angular/core';
import { WEDDING } from './wedding';

/** Full-screen velvet curtain intro. Click/tap (or Enter) to open it. */
@Component({
  selector: 'app-curtain',
  template: `
    @if (state() !== 'gone') {
      <div class="curtain" [class.opening]="state() === 'opening'" role="dialog" aria-modal="true"
           aria-label="Wedding invitation. Open the curtain to enter." (click)="open()">
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
            <button class="c-btn" type="button" (click)="open(); $event.stopPropagation()" autofocus>
              Open the curtain
            </button>
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

  constructor() {
    document.body.classList.add('curtain-lock');
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected open(): void {
    if (this.state() !== 'closed') return;
    this.state.set('opening');
    document.body.classList.add('opened');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.timer = setTimeout(() => {
      this.state.set('gone');
      document.body.classList.remove('curtain-lock');
    }, reduced ? 100 : 2600);
  }
}
