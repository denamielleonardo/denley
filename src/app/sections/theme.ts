import { Component } from '@angular/core';
import { Reveal } from '../reveal';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-theme',
  imports: [Reveal],
  template: `
    <section id="theme" class="section dark photo" [style.background-image]="'url(' + w.photos.theme + ')'">
      <div class="container narrow center">
        <header class="section-head" reveal>
          <p class="kicker">Our theme</p>
          <h2 class="script">{{ w.theme }}</h2>
        </header>
        <p class="lead" reveal>{{ w.themeBlurb }}</p>
        <div class="swatches" reveal>
          @for (c of w.palette; track c.name) {
            <div class="swatch">
              <span [style.background]="c.hex"></span>
              <small>{{ c.name }}</small>
            </div>
          }
        </div>
        <p class="dress" reveal><strong>Dress code:</strong> {{ w.dressCode }}</p>
      </div>
    </section>
  `,
})
export class Theme {
  protected readonly w = WEDDING;
}
