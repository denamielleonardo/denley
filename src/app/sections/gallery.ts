import { Component, DestroyRef, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { Reveal } from '../reveal';
import { WEDDING } from '../wedding';

/**
 * One photo frame that crossfades through every photo, forever.
 * Clicking the frame opens a full-screen viewer to browse manually.
 */
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

        <div class="slideshow" reveal="zoom" (mouseenter)="hover.set(true)" (mouseleave)="hover.set(false)">
          <div class="frame" role="button" tabindex="0" [attr.aria-label]="'Open photo ' + (index() + 1) + ' of ' + all.length"
               (click)="open(index())" (keydown.enter)="open(index())">
            @for (s of slides(); track s.photo.src) {
              <div class="slide" [class.on]="s.i === index()">
                <img class="bg" [src]="s.photo.src" alt="" aria-hidden="true" />
                <img class="fg" [src]="s.photo.src" [alt]="s.photo.alt" />
              </div>
            }
            <span class="count">{{ pad(index() + 1) }} / {{ pad(all.length) }}</span>
          </div>
          <button class="nav-btn prev" type="button" aria-label="Previous photo" (click)="go(-1)">&#8249;</button>
          <button class="nav-btn next" type="button" aria-label="Next photo" (click)="go(1)">&#8250;</button>
        </div>
      </div>

      @if (current() !== null) {
        <div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" (click)="close()"
             (touchstart)="touchX = $event.touches[0].clientX" (touchend)="onSwipe($event)">
          <button class="lb-btn close" type="button" aria-label="Close" (click)="close()">&times;</button>
          <button class="lb-btn prev" type="button" aria-label="Previous" (click)="step(-1, $event)">&#8249;</button>
          <img [src]="all[current()!].src" [alt]="all[current()!].alt" (click)="$event.stopPropagation()" />
          <button class="lb-btn next" type="button" aria-label="Next" (click)="step(1, $event)">&#8250;</button>
          <span class="lb-count">{{ current()! + 1 }} / {{ all.length }}</span>
        </div>
      }
    </section>
  `,
})
export class Gallery {
  /** How long each photo stays on screen (ms). */
  private static readonly INTERVAL = 3800;

  protected readonly all = WEDDING.gallery;
  protected readonly index = signal(0);
  protected readonly hover = signal(false);
  protected readonly current = signal<number | null>(null); // full-screen viewer
  protected touchX = 0;

  private readonly inView = signal(false);
  private readonly reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Only the current photo and its neighbours are in the page, so a long list stays light. */
  protected readonly slides = computed(() => {
    const n = this.all.length;
    const i = this.index();
    const ids = n <= 3 ? this.all.map((_, k) => k) : [(i - 1 + n) % n, i, (i + 1) % n];
    return ids.map(k => ({ i: k, photo: this.all[k] }));
  });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const io = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([e]) => this.inView.set(e.isIntersecting), { threshold: 0.3 });
    io?.observe(el);

    // Advance only while the gallery is on screen, not hovered, and the viewer is closed.
    const timer = setInterval(() => {
      if (this.reduced || this.hover() || this.current() !== null || document.hidden) return;
      if (io && !this.inView()) return;
      this.go(1);
    }, Gallery.INTERVAL);

    inject(DestroyRef).onDestroy(() => { clearInterval(timer); io?.disconnect(); });
  }

  protected pad(n: number): string { return n < 10 ? '0' + n : String(n); }

  protected go(by: number): void {
    const n = this.all.length;
    this.index.update(i => (i + by + n) % n);
  }

  protected open(i: number): void { this.current.set(i); }
  protected close(): void {
    // Continue the slideshow from the photo that was being viewed.
    const c = this.current();
    if (c !== null) this.index.set(c);
    this.current.set(null);
  }
  protected step(by: number, e: Event): void {
    e.stopPropagation();
    const n = this.all.length;
    this.current.update(i => (i === null ? i : (i + by + n) % n));
  }
  protected onSwipe(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchX;
    if (Math.abs(dx) > 50) this.step(dx < 0 ? 1 : -1, e);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.current() === null) return;
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowLeft') this.step(-1, e);
    else if (e.key === 'ArrowRight') this.step(1, e);
  }
}
