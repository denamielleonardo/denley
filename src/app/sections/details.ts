import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Reveal } from '../reveal';
import { WEDDING } from '../wedding';
import { Clock } from './clock';
import { Journey } from './journey';

@Component({
  selector: 'app-details',
  imports: [Reveal, Journey, Clock],
  template: `
    <section id="details" class="section">
      <div class="container">
        <header class="section-head" reveal>
          <p class="kicker">The celebration</p>
          <h2 class="script">When &amp; Where</h2>
        </header>

        <div reveal><app-clock /></div>

        <div class="where" reveal>
          <div class="pin" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
          </div>
          <p class="kicker">Where</p>
          <p class="venue-name">{{ w.venue }}</p>
          @if (w.address) { <p class="addr">{{ w.address }}</p> }
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
  private readonly q = encodeURIComponent(WEDDING.mapQuery);

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
