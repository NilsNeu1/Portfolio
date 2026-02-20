import { Directive, ElementRef, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { VisibilityService } from './section-observer.service';

@Directive({
  selector: '[appObserveSection]',
  standalone: true
})
export class ObserveSectionDirective implements OnInit, OnDestroy {
  @Input({ required: true, alias: 'appObserveSection' }) sectionId!: string;

  private el = inject(ElementRef);
  private service = inject(VisibilityService);
  private observer?: IntersectionObserver;

  ngOnInit() {
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