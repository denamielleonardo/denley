import { Component, HostListener, signal } from '@angular/core';
import { Reveal } from '../reveal';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-gallery',
  imports: [Reveal],
  template: `
    <section id="gallery" class="section paper">
      <div class="container">
        <header class="section-head" reveal>
          <p class="kicker">Moments</p>
          <h2 class="script">Our Gallery</h2>
        </header>

        <div class="masonry">
          @for (p of photos; track p.src; let i = $index) {
            <button class="tile" type="button" reveal (click)="open(i)" [attr.aria-label]="'Open photo ' + (i + 1)">
              <img [src]="p.src" [alt]="p.alt" loading="lazy" />
            </button>
          }
        </div>
      </div>

      @if (current() !== null) {
        <div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" (click)="close()">
          <button class="lb-btn close" type="button" aria-label="Close" (click)="close()">&times;</button>
          <button class="lb-btn prev" type="button" aria-label="Previous" (click)="step(-1, $event)">&#8249;</button>
          <img [src]="photos[current()!].src" [alt]="photos[current()!].alt" (click)="$event.stopPropagation()" />
          <button class="lb-btn next" type="button" aria-label="Next" (click)="step(1, $event)">&#8250;</button>
        </div>
      }
    </section>
  `,
})
export class Gallery {
  protected readonly photos = WEDDING.gallery;
  protected readonly current = signal<number | null>(null);

  protected open(i: number): void { this.current.set(i); }
  protected close(): void { this.current.set(null); }
  protected step(by: number, e: Event): void {
    e.stopPropagation();
    const n = this.photos.length;
    this.current.update(i => (i === null ? i : (i + by + n) % n));
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.current() === null) return;
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowLeft') this.step(-1, e);
    else if (e.key === 'ArrowRight') this.step(1, e);
  }
}
