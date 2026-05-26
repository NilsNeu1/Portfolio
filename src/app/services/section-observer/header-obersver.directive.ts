// import { isPlatformBrowser } from '@angular/common';
// import { Directive, inject, OnInit, OnDestroy, PLATFORM_ID, output } from '@angular/core';

// @Directive({
//   selector: '[appHeaderObserver]',
//   standalone: true
// })
// export class HeaderObserverDirective implements OnInit, OnDestroy {
//   private platformId = inject(PLATFORM_ID);
//   private observers: IntersectionObserver[] = [];

//   readonly sectionChange = output<{ darkUi: boolean }>();

//   ngOnInit() {
//     if (!isPlatformBrowser(this.platformId)) return;
//     if (!('IntersectionObserver' in window)) return;

//     setTimeout(() => this.observeAllSections(), 100);
//   }

//   private observeAllSections() {
//     const sections = document.querySelectorAll<HTMLElement>('[appObserveSection]');

//     sections.forEach(section => {
//   const observer = new IntersectionObserver(
//     ([entry]) => {
//       if (entry.isIntersecting) {
//         const backgroundType = section.getAttribute('backgroundtype');
//         const darkUi = backgroundType === 'bright';
//         this.sectionChange.emit({ darkUi });
//       }
//     },
//     {
//       rootMargin: '0px 0px -95% 0px',
//       threshold: 0
//     }
//   );

//   observer.observe(section);
//   this.observers.push(observer);
// });
//   }

//   ngOnDestroy() {
//     this.observers.forEach(o => o.disconnect());
//   }
// }