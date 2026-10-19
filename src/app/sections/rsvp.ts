import { Component } from '@angular/core';
import { Reveal } from '../reveal';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-rsvp',
  imports: [Reveal],
  template: `
    <section id="rsvp" class="section dark">
      <div class="container narrow center">
        <p class="kicker" reveal>Will you join us?</p>
        <h2 class="script" reveal [revealDelay]="120">RSVP</h2>
        <p class="lead" reveal [revealDelay]="240">{{ w.rsvpNote }}</p>
        @if (w.rsvpUrl) {
          <a class="btn" [href]="w.rsvpUrl" target="_blank" rel="noopener" reveal="pop" [revealDelay]="360">Respond now</a>
        }
      </div>
    </section>
    <footer class="footer">
      <p class="script">{{ w.brideFirst }} &amp; {{ w.groomFirst }}</p>
      <small>{{ dateText }} · {{ w.venue }}</small>
    </footer>
  `,
})
export class Rsvp {
  protected readonly w = WEDDING;
  protected readonly dateText = new Date(WEDDING.startISO).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: WEDDING.timeZone,
  });
}
