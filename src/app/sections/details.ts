import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Journey } from './journey';
import { Reveal } from '../reveal';
import { Tilt } from '../tilt';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-details',
  imports: [Reveal, Tilt, Journey],
  template: `
    <section id="details" class="section">
      <div class="container">
        <header class="section-head" reveal>
          <p class="kicker">The celebration</p>
          <h2 class="script">When &amp; Where</h2>
        </header>

        <div class="cards">
          <article class="card" reveal tilt>
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M7 2v3M17 2v3M3 9h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>
            </div>
            <h3>Date</h3>
            <p class="big">{{ weekday }}</p>
            <p>{{ dateText }}</p>
          </article>
          <article class="card" reveal tilt>
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            </div>
            <h3>Time</h3>
            <p class="big">{{ timeText }}</p>
            <p>Ceremony begins</p>
          </article>
          <article class="card" reveal tilt>
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
            </div>
            <h3>Venue</h3>
            <p class="big">{{ w.venue }}</p>
            @if (w.address) { <p>{{ w.address }}</p> }
          </article>
        </div>

        <div reveal><app-journey /></div>

        <div class="map-wrap" reveal>
          <iframe title="Map to the venue" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                  [src]="mapSrc"></iframe>
        </div>

        <div class="actions center" reveal>
          <a class="btn" [href]="mapLink" target="_blank" rel="noopener">Get directions</a>
          <button class="btn ghost" type="button" (click)="addToCalendar()">Add to calendar</button>
        </div>
      </div>
    </section>
  `,
})
export class Details {
  protected readonly w = WEDDING;
  private readonly d = new Date(WEDDING.startISO);
  private readonly q = encodeURIComponent(WEDDING.mapQuery);

  protected readonly weekday = this.d.toLocaleDateString('en-US', { weekday: 'long', timeZone: WEDDING.timeZone });
  protected readonly dateText = this.d.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: WEDDING.timeZone,
  });
  protected readonly timeText = this.d.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: WEDDING.timeZone,
  });
  protected readonly mapLink = `https://www.google.com/maps/search/?api=1&query=${this.q}`;
  protected readonly mapSrc = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    `https://maps.google.com/maps?q=${this.q}&output=embed`,
  );

  protected addToCalendar(): void {
    const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, '');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding//EN', 'BEGIN:VEVENT',
      `UID:wedding-${fmt(WEDDING.startISO)}@wedding`,
      `DTSTAMP:${fmt(new Date().toISOString())}`,
      `DTSTART:${fmt(WEDDING.startISO)}`,
      `DTEND:${fmt(WEDDING.endISO)}`,
      `SUMMARY:Wedding of ${WEDDING.brideFirst} & ${WEDDING.groomFirst}`,
      `LOCATION:${WEDDING.venue}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding.ics';
    a.click();
    URL.revokeObjectURL(url);
  }
}
