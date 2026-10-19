import { Component } from '@angular/core';
import { Reveal } from '../reveal';

/** Quiet pearl band with a short line of text. */
@Component({
  selector: 'app-quote',
  imports: [Reveal],
  template: `
    <section class="band">
      <blockquote reveal="zoom">
        <span class="script">Two hearts, one story</span>
        <p>&ldquo;Whatever our souls are made of, his and mine are the same.&rdquo;</p>
      </blockquote>
    </section>
  `,
})
export class Quote {}
