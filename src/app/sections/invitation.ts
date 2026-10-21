import { Component } from '@angular/core';
import { Reveal } from '../reveal';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-invitation',
  imports: [Reveal],
  template: `
    <section id="invitation" class="section paper">
      <div class="container split">
        <figure class="arch" reveal="zoom">
          <img [src]="w.photos.arch" alt="Her engagement ring, with Shirley and Den behind" loading="lazy" />
        </figure>
        <div class="split-text">
          <p class="kicker" reveal="right">Save the date</p>
          <h2 class="script long" reveal="right" [revealDelay]="150">{{ w.invitationTitle }}</h2>
          <p class="lead" reveal="right" [revealDelay]="300">{{ w.invitation }}</p>
        </div>
      </div>
    </section>
  `,
})
export class Invitation {
  protected readonly w = WEDDING;
}
