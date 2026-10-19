import { Component, HostListener, signal } from '@angular/core';
import { Curtain } from './curtain';
import { Details } from './sections/details';
import { Gallery } from './sections/gallery';
import { Hero } from './sections/hero';
import { Invitation } from './sections/invitation';
import { Quote } from './sections/quote';
import { Rsvp } from './sections/rsvp';
import { Video } from './sections/video';
import { WEDDING } from './wedding';

@Component({
  selector: 'app-root',
  imports: [Curtain, Hero, Invitation, Quote, Details, Gallery, Video, Rsvp],
  template: `
    <app-curtain />
    <header class="nav" [class.solid]="scrolled()" [class.open]="menu()">
      <a class="brand" href="#home">{{ initials }}</a>
      <button class="burger" type="button" aria-label="Menu" [attr.aria-expanded]="menu()" (click)="menu.set(!menu())">
        <span></span><span></span><span></span>
      </button>
      <nav (click)="menu.set(false)">
        @for (l of links; track l.href) {
          <a [href]="l.href">{{ l.label }}</a>
        }
      </nav>
    </header>
    <main>
      <app-hero />
      <app-invitation />
      <app-quote />
      <app-details />
      <app-gallery />
      <app-video />
      <app-rsvp />
    </main>
  `,
})
export class App {
  protected readonly initials = `${WEDDING.groomFirst[0]} & ${WEDDING.brideFirst[0]}`;
  protected readonly scrolled = signal(false);
  protected readonly menu = signal(false);
  protected readonly links = [
    { href: '#details', label: 'Details' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#video', label: 'Video' },
    { href: '#rsvp', label: 'RSVP' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
