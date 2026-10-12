import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { Reveal } from '../reveal';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-invitation',
  imports: [Reveal],
  template: `
    <section id="invitation" class="section paper">
      <div class="container split">
        <figure class="arch" reveal>
          <img [src]="w.photos.arch" alt="Shirley and Den Amiel" loading="lazy" />
        </figure>
        <div class="split-text" reveal>
          <p class="kicker">Save the date</p>
          <h2 class="script">With love &amp; joy</h2>
          <p class="lead">{{ w.invitation }}</p>

          @if (!over()) {
            <div class="countdown" role="timer" aria-label="Time until the wedding">
              @for (u of units(); track u.label) {
                <div class="cd-box">
                  <strong>{{ u.value }}</strong>
                  <span>{{ u.label }}</span>
                </div>
              }
            </div>
          } @else {
            <p class="married">We're married! Thank you for celebrating with us.</p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Invitation {
  protected readonly w = WEDDING;
  private readonly target = new Date(WEDDING.startISO).getTime();
  private readonly now = signal(Date.now());

  protected readonly over = computed(() => this.target - this.now() <= 0);
  protected readonly units = computed(() => {
    let s = Math.max(0, Math.floor((this.target - this.now()) / 1000));
    const days = Math.floor(s / 86400); s -= days * 86400;
    const hours = Math.floor(s / 3600); s -= hours * 3600;
    const minutes = Math.floor(s / 60); s -= minutes * 60;
    return [
      { label: 'Days', value: days },
      { label: 'Hours', value: hours },
      { label: 'Minutes', value: minutes },
      { label: 'Seconds', value: s },
    ];
  });

  constructor() {
    const id = setInterval(() => this.now.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
