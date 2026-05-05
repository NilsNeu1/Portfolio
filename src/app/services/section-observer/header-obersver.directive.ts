
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Input, inject, OnInit, OnDestroy, PLATFORM_ID, output } from '@angular/core';

@Directive({
  selector: '[appHeaderObserver]',
  standalone: true
})
export class HeaderObserverDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  // Event das feuert wenn der Hero-Bereich verlassen/betreten wird
  readonly pastHero = output<boolean>();

  ngOnInit() {
    this.initObserver();
  }

  private initObserver() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!('IntersectionObserver' in window)) return;

    // Nur die obersten 5% des Viewports werden beobachtet.
    // Das Element gilt als "sichtbar" solange es noch in diesem Streifen ist.
    // Sobald es rausscrollt -> isIntersecting = false -> pastHero = true
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.pastHero.emit(!entry.isIntersecting);
      },
      {
        rootMargin: '0px 0px -95% 0px', // nur obere 5% des Viewports aktiv
        threshold: 0
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}