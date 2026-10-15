import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { WEDDING } from './wedding';

/** Full-screen velvet curtain intro. Opens by itself after a short pause; a click/tap skips the wait. */
@Component({
  selector: 'app-curtain',
  template: `
    @if (state() !== 'gone') {
      <div class="curtain" [class.opening]="state() === 'opening' || state() === 'drawn'" [class.drawn]="state() === 'drawn'" role="dialog" aria-modal="true"
           aria-label="Wedding invitation" (click)="open()">
        <div class="stage">
          <div class="dw left"><div class="drape" [style.clip-path]="shape()"></div></div>
          <div class="dw right"><div class="drape" [style.clip-path]="shape()"></div></div>
          <div class="pelmet"></div>
          <div class="tie left"></div>
          <div class="tie right"></div>
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
  protected readonly state = signal<'closed' | 'opening' | 'drawn' | 'gone'>('closed');
  /** Clip-path for the left half (the right half is mirrored). Same vertex count in both states so it can animate. */
  private static polygon(stage: 'closed' | 'open' | 'away'): string {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 10; i++) {
      const phi = (i * 9 * Math.PI) / 180;
      pts.push([stage === 'open' ? 17 + 30 * Math.cos(phi) : stage === 'away' ? 0 : 50.3, 68 * Math.sin(phi)]);
    }
    for (const y of [76, 84, 92, 100]) pts.push([stage === 'open' ? 17 + ((y - 68) / 32) * 3 : stage === 'away' ? 0 : 50.3, y]);
    const f = (n: number) => n.toFixed(2) + '%';
    return `polygon(0% 0%, ${pts.map(([x, y]) => f(x) + ' ' + f(y)).join(', ')}, 0% 100%)`;
  }

  protected readonly shape = computed(() => Curtain.polygon(this.state() === 'opening' ? 'open' : this.state() === 'drawn' ? 'away' : 'closed'));
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
    // 1) swing to the tied-back pose, 2) hold briefly, 3) sweep fully off to the sides, 4) remove
    this.timer = setTimeout(() => {
      this.state.set('drawn');
      this.timer = setTimeout(() => {
        this.state.set('gone');
        document.body.classList.remove('curtain-lock');
      }, reduced ? 100 : 1300);
    }, reduced ? 100 : 2000);
  }
}
