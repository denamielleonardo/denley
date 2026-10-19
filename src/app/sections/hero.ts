import { Component } from '@angular/core';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-hero',
  template: `
    <section id="home" class="hero">
      <img class="hero-bg" [src]="w.photos.hero" alt="" fetchpriority="high" />
      <div class="hero-shade"></div>
      <div class="hero-frame"></div>
      <div class="hero-inner">
        <p class="invited">You are invited!</p>
        <p class="hero-lead">to the wedding of</p>
        <h1 class="names">
          <span>{{ w.brideFirst }}</span>
          <em>&amp;</em>
          <span>{{ w.groomFirst }}</span>
        </h1>
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
  private readonly d = new Date(WEDDING.startISO);
  protected readonly dateText = this.d.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: WEDDING.timeZone,
  });
  protected readonly timeText = this.d.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: WEDDING.timeZone,
  });

}
