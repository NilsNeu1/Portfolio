import { Directive, ElementRef, Input, inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VisibilityService } from './section-observer.service';

@Directive({
  selector: '[appObserveSection]',
  standalone: true
})
export class ObserveSectionDirective implements OnInit, OnDestroy {
  @Input({ required: true, alias: 'appObserveSection' }) sectionId!: string;

  private el = inject(ElementRef);
  private service = inject(VisibilityService);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        this.service.setActive(this.sectionId);
      }
    }, { threshold: 0.5 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}