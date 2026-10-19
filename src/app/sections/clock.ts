import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { WEDDING } from '../wedding';

/** Running clock: analog face (sweeping second hand, set to the ceremony time) + live countdown. */
@Component({
  selector: 'app-clock',
  template: `
    <div class="clockwrap" role="timer" [attr.aria-label]="label()">
      <div class="analog" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="96" fill="#fffefb" stroke="#b79a5b" stroke-width="3"/>
          <circle cx="100" cy="100" r="89" fill="none" stroke="#b79a5b" stroke-width=".8" opacity=".6"/>
          @for (t of ticks; track t) {
            <line x1="100" y1="14" x2="100" [attr.y2]="t % 5 === 0 ? 24 : 19" [attr.stroke-width]="t % 5 === 0 ? 2 : 1"
                  stroke="#6f6558" [attr.transform]="'rotate(' + t * 6 + ' 100 100)'"/>
          }
          <g font-family="Cormorant Garamond, Georgia, serif" font-size="17" fill="#2f2a26" text-anchor="middle">
            <text x="100" y="47">XII</text><text x="157" y="106">III</text><text x="100" y="168">VI</text><text x="43" y="106">IX</text>
          </g>
          <g class="hand" style="transform: rotate(120deg)"><line x1="100" y1="100" x2="100" y2="58" stroke="#2f2a26" stroke-width="5" stroke-linecap="round"/></g>
          <g class="hand"><line x1="100" y1="100" x2="100" y2="34" stroke="#2f2a26" stroke-width="3" stroke-linecap="round"/></g>
          <g class="hand sec" [style.animation-delay.s]="-offset">
            <line x1="100" y1="116" x2="100" y2="28" stroke="#a8864a" stroke-width="1.5" stroke-linecap="round"/>
          </g>
          <circle cx="100" cy="100" r="5" fill="#a8864a" stroke="#fffefb" stroke-width="1.5"/>
        </svg>
      </div>

      <div class="digital">
        <p class="cd-label">{{ label() }}</p>
        <div class="flip-row">
          @for (u of units(); track u.label) {
            <div class="flip">
              <span class="num">
                @for (v of [u.value]; track v) { <span class="tick">{{ pad(v) }}</span> }
              </span>
              <small>{{ u.label }}</small>
            </div>
          }
        </div>
        <p class="when-line"><b>{{ weekday }}</b>, {{ dateText }}<br />at <b>{{ timeText }}</b></p>
      </div>
    </div>
  `,
})
export class Clock {
  protected readonly ticks = Array.from({ length: 60 }, (_, i) => i);
  /** Start the second hand at the real current second so it matches the digital seconds. */
  protected readonly offset = new Date().getSeconds() + new Date().getMilliseconds() / 1000;

  private readonly target = new Date(WEDDING.startISO);
  private readonly now = signal(Date.now());

  protected readonly over = computed(() => this.target.getTime() - this.now() <= 0);
  protected readonly label = computed(() =>
    this.over() ? 'Happily married for' : 'Counting down to our day');
  protected readonly units = computed(() => {
    let s = Math.floor(Math.abs(this.target.getTime() - this.now()) / 1000);
    const days = Math.floor(s / 86400); s -= days * 86400;
    const hours = Math.floor(s / 3600); s -= hours * 3600;
    const minutes = Math.floor(s / 60); s -= minutes * 60;
    return [
      { label: 'Days', value: days }, { label: 'Hours', value: hours },
      { label: 'Minutes', value: minutes }, { label: 'Seconds', value: s },
    ];
  });

  protected readonly weekday = this.target.toLocaleDateString('en-US', { weekday: 'long', timeZone: WEDDING.timeZone });
  protected readonly dateText = this.target.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: WEDDING.timeZone,
  });
  protected readonly timeText = this.target.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: WEDDING.timeZone,
  });

  constructor() {
    const id = setInterval(() => this.now.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  protected pad(n: number): string { return n < 10 ? '0' + n : String(n); }
}
