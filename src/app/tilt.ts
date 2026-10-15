import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/** Subtle 3D tilt that follows the mouse (ignored on touch devices). */
@Directive({ selector: '[tilt]' })
export class Tilt {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    && !matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('mousemove', ['$event'])
  move(e: MouseEvent): void {
    if (!this.fine) return;
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    this.el.style.transition = 'transform .12s ease-out';
    this.el.style.transform = `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg) translateZ(8px)`;
  }

  @HostListener('mouseleave')
  leave(): void {
    this.el.style.transition = 'transform .5s ease';
    this.el.style.transform = '';
  }
}
