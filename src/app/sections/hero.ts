import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-hero',
  template: `
    <section id="home" class="hero">
      <img class="hero-bg" [src]="w.photos.hero" alt="" fetchpriority="high" />
      <div class="hero-shade"></div>
      <div class="hero-frame"></div>
      <div class="hero-inner">
        <p class="eyebrow">You are invited!</p>
        <h1 class="names">
          <span>{{ w.brideFirst }}</span>
          <em>&amp;</em>
          <span>{{ w.groomFirst }}</span>
        </h1>
        <p class="hero-sub">are getting married</p>
        <div class="hero-meta">
          <span>{{ dateText }}</span>
          <i></i>
          <span>{{ timeText }}</span>
        </div>
        <p class="hero-venue">{{ w.venue }}</p>
        <a class="btn" href="#details">See the details</a>
      </div>
      <a class="scroll-cue" href="#invitation" aria-label="Scroll down"><span></span></a>
    </section>
  `,
})
export class Hero {
  protected readonly w = WEDDING;
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly d = new Date(WEDDING.startISO);
  protected readonly dateText = this.d.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: WEDDING.timeZone,
  });
  protected readonly timeText = this.d.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: WEDDING.timeZone,
  });

  /** Layered mouse parallax: background and text drift in opposite directions. */
  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    this.el.style.setProperty('--mx', x.toFixed(3));
    this.el.style.setProperty('--my', y.toFixed(3));
  }
}
