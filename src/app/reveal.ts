import { DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

/** Fades an element in the first time it scrolls into view. */
@Directive({
  selector: '[reveal]',
  host: { class: 'reveal', '[class.in]': 'shown()' },
})
export class Reveal {
  protected readonly shown = signal(false);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    if (typeof IntersectionObserver === 'undefined') {
      this.shown.set(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.shown.set(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    inject(DestroyRef).onDestroy(() => io.disconnect());
  }
}
