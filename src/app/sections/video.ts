import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Reveal } from '../reveal';
import { Tilt } from '../tilt';
import { WEDDING } from '../wedding';

@Component({
  selector: 'app-video',
  imports: [Reveal, Tilt],
  template: `
    <section id="video" class="section">
      <div class="container narrow">
        <header class="section-head" reveal>
          <p class="kicker">Watch</p>
          <h2 class="script">Our Story</h2>
        </header>
        <div class="video-frame" reveal tilt>
          @if (youtube) {
            <iframe [src]="youtube" title="Our video" allowfullscreen loading="lazy"
                    allow="accelerometer; encrypted-media; picture-in-picture"></iframe>
          } @else if (w.videoUrl) {
            <video controls preload="metadata" [poster]="w.videoPoster" [src]="w.videoUrl"></video>
          } @else {
            <img [src]="w.videoPoster" alt="Video coming soon" loading="lazy" />
            <div class="play" aria-hidden="true"><span></span></div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Video {
  protected readonly w = WEDDING;
  protected readonly youtube = this.toEmbed(WEDDING.videoUrl);

  private readonly sanitizer = inject(DomSanitizer);

  private toEmbed(url: string) {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return m
      ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${m[1]}`)
      : null;
  }
}
