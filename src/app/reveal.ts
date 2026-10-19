import { DestroyRef, Directive, ElementRef, computed, inject, input, signal } from '@angular/core';

/**
 * Animates an element the first time it scrolls into view.
 *   reveal="left|right|zoom|pop|fade|rise"  picks the entrance (default: gentle rise)
 *   [revealDelay]="120"                      staggers it (ms)
 * Children can also react through the `.in` class this adds.
 */
@Directive({
  selector: '[reveal]',
  host: {
    class: 'reveal',
    '[class.in]': 'shown()',
    '[attr.data-anim]': 'anim()',
    '[style.transition-delay.ms]': 'delay()',
  },
})
export class Reveal {
  readonly variant = input('', { alias: 'reveal' });
  readonly revealDelay = input(0);

  protected readonly shown = signal(false);
  private readonly cleared = signal(false);
  protected readonly anim = computed(() => this.variant() || 'up');
  /** Delay only applies to the entrance; cleared afterwards so hover transitions aren't delayed. */
  protected readonly delay = computed(() => (this.cleared() ? 0 : this.revealDelay()));

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const show = () => {
      this.shown.set(true);
      setTimeout(() => this.cleared.set(true), this.revealDelay() + 1400);
    };
    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    inject(DestroyRef).onDestroy(() => io.disconnect());
  }
}
