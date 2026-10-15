import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { WEDDING } from '../wedding';

interface Car { color: string; lane: number; dur: number; delay: number; married?: boolean }

/** Cartoon 3D scene: cars driving along a road to the venue. Pure CSS/SVG. */
@Component({
  selector: 'app-journey',
  template: `
    <div class="journey" aria-hidden="true">
      <div class="world">
        <div class="sky"><i class="sun"></i><i class="cloud c1"></i><i class="cloud c2"></i><i class="cloud c3"></i></div>

        <svg class="hills" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0 200V110Q150 40 320 100T640 90T960 70T1200 100V200Z" fill="#a3ad88"/>
          <path d="M0 200V140Q200 90 420 135T800 120T1200 140V200Z" fill="#7d8b6a"/>
        </svg>

        <div class="trees">
          @for (t of trees; track $index) {
            <svg class="tree" [style.left.%]="t.x" [style.--s]="t.s" [style.animation-delay.s]="t.d" viewBox="0 0 60 90">
              <rect x="27" y="62" width="7" height="26" rx="2" fill="#6b4a35"/>
              <circle cx="30" cy="38" r="26" fill="#56633f" stroke="#3b2a20" stroke-width="2.5"/>
              <circle cx="22" cy="30" r="9" fill="#6f7f5a"/>
            </svg>
          }
        </div>

        <div class="venue">
          <div class="pin"><span>{{ time }}</span></div>
          <svg viewBox="0 0 260 190">
            <ellipse cx="130" cy="182" rx="118" ry="8" fill="rgba(0,0,0,.18)"/>
            <rect x="30" y="86" width="200" height="94" fill="#d9b78b" stroke="#3b2a20" stroke-width="3"/>
            <g stroke="#a8825a" stroke-width="2"><path d="M30 106h200M30 126h200M30 146h200M30 166h200"/></g>
            <polygon points="14,92 130,20 246,92" fill="#8a4b36" stroke="#3b2a20" stroke-width="3" stroke-linejoin="round"/>
            <g stroke="#6b3524" stroke-width="2"><path d="M44 82l86-52M70 88l60-36M216 82l-86-52"/></g>
            <rect x="108" y="126" width="44" height="54" rx="22 22 0 0" fill="#6b4a35" stroke="#3b2a20" stroke-width="3"/>
            <circle cx="144" cy="156" r="2.5" fill="#f0d28a"/>
            <rect x="46" y="112" width="38" height="34" fill="#ffe7a3" stroke="#3b2a20" stroke-width="3"/><path d="M65 112v34M46 129h38" stroke="#3b2a20" stroke-width="2"/>
            <rect x="176" y="112" width="38" height="34" fill="#ffe7a3" stroke="#3b2a20" stroke-width="3"/><path d="M195 112v34M176 129h38" stroke="#3b2a20" stroke-width="2"/>
            <circle cx="130" cy="64" r="11" fill="#ffe7a3" stroke="#3b2a20" stroke-width="3"/>
            <rect x="82" y="96" width="96" height="18" rx="3" fill="#3b2a20"/>
            <text x="130" y="109" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f0d28a" font-style="italic">Casa Beatriz</text>
            <path d="M24 100q106 22 212 0" fill="none" stroke="#3b2a20" stroke-width="1.2"/>
            <g class="bulbs" fill="#fff3b0"><circle cx="44" cy="103" r="3"/><circle cx="80" cy="109" r="3"/><circle cx="116" cy="112" r="3"/><circle cx="152" cy="112" r="3"/><circle cx="188" cy="109" r="3"/><circle cx="222" cy="103" r="3"/></g>
            <path class="heart" d="M130 8c-8-9-20 0-12 9l12 11 12-11c8-9-4-18-12-9Z" fill="#b5654a" stroke="#3b2a20" stroke-width="2"/>
          </svg>
        </div>

        <div class="road">
          <i class="edge top"></i><i class="edge bottom"></i><i class="dash"></i>
          @for (c of cars; track $index) {
            <div class="car" [class.married]="c.married" [style.--car]="c.color" [style.bottom.%]="c.lane"
                 [style.animation-duration.s]="c.dur" [style.animation-delay.s]="c.delay">
              <svg viewBox="0 0 170 90">
                <ellipse cx="85" cy="84" rx="70" ry="5" fill="rgba(0,0,0,.3)"/>
                <g class="bob">
                  @if (c.married) {
                    <g class="cans" stroke="#3b2a20" stroke-width="1.2"><path d="M12 70q-8 6-14 4M12 70q-10 2-16 10" fill="none"/><rect x="-22" y="72" width="7" height="9" fill="#d9d9d9" rx="1"/><rect x="-16" y="80" width="7" height="9" fill="#d9d9d9" rx="1"/></g>
                  }
                  <path d="M8 66Q8 48 26 45L46 42Q58 20 82 18L112 18Q134 20 144 42L158 46Q166 50 166 66V70H8Z" fill="var(--car)" stroke="#3b2a20" stroke-width="3" stroke-linejoin="round"/>
                  <path d="M54 42Q64 28 82 26L110 26Q124 28 132 42Z" fill="#cfe8f3" stroke="#3b2a20" stroke-width="2.5" stroke-linejoin="round"/>
                  <path d="M96 27v15" stroke="#3b2a20" stroke-width="2.5"/>
                  <path d="M20 58h20" stroke="rgba(255,255,255,.55)" stroke-width="3" stroke-linecap="round"/>
                  <circle cx="160" cy="56" r="4.5" fill="#ffe27a" stroke="#3b2a20" stroke-width="2"/>
                  @if (c.married) {
                    <path d="M84 56c-6-7-15 0-9 7l9 8 9-8c6-7-3-14-9-7Z" fill="#fff" stroke="#3b2a20" stroke-width="1.5"/>
                    <path class="love" d="M70 10c-3-4-8 0-5 4l5 5 5-5c3-4-2-8-5-4Z" fill="#b5654a"/>
                  }
                </g>
                <g class="wheel"><circle cx="44" cy="72" r="14" fill="#2a1d15" stroke="#3b2a20" stroke-width="2"/><circle cx="44" cy="72" r="6" fill="#ddd"/><path d="M44 62v20M34 72h20" stroke="#999" stroke-width="2"/></g>
                <g class="wheel"><circle cx="128" cy="72" r="14" fill="#2a1d15" stroke="#3b2a20" stroke-width="2"/><circle cx="128" cy="72" r="6" fill="#ddd"/><path d="M128 62v20M118 72h20" stroke="#999" stroke-width="2"/></g>
              </svg>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class Journey {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly time = new Date(WEDDING.startISO).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: WEDDING.timeZone,
  });
  protected readonly trees = [
    { x: 2, s: 1.1, d: 0 }, { x: 14, s: .8, d: .6 }, { x: 30, s: 1, d: 1.1 }, { x: 46, s: .7, d: .3 },
    { x: 58, s: .9, d: .9 }, { x: 90, s: 1.15, d: .4 },
  ];
  protected readonly cars: Car[] = [
    { color: '#b5654a', lane: 14, dur: 9, delay: 0 },
    { color: '#7d8b6a', lane: 52, dur: 11, delay: 2.5 },
    { color: '#f6efe2', lane: 33, dur: 13, delay: 5, married: true },
    { color: '#b8934a', lane: 70, dur: 10, delay: 7 },
  ];

  /** Gentle 3D swivel of the whole scene with the mouse. */
  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    const r = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    this.el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.el.style.setProperty('--mx', '0');
    this.el.style.setProperty('--my', '0');
  }
}
