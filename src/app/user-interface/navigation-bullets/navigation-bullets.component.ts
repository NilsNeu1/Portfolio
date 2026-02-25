import { Component, computed, inject } from '@angular/core';
 import { MatIconModule } from '@angular/material/icon';
  import { NgIf, NgFor, NgClass } from '@angular/common';
   import { VisibilityService } from '../../services/section-observer/section-observer.service';



@Component({
  selector: 'app-navigation-bullets',
  standalone: true,
  imports: [MatIconModule, NgIf, NgFor, NgClass],
  templateUrl: './navigation-bullets.component.html',
  styleUrl: './navigation-bullets.component.scss'
})
export class NavigationBulletsComponent {
  private VisibilityService = inject(VisibilityService);

  activeSectionId: string | null = null;
  sections: { id: string }[] = [];
  bulletColorClass: string = '';
  activeBulletColorClass: string = '';

  private observeSections() {

    const sections = Array.from(document.querySelectorAll('section[nav]'))

      this.sections = sections.map(section => ({ id: section.id }));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSectionId = entry.target.id;
          this.updateBulletColors(entry.target);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  }

  private getSectionBackgroundType(sectionElement: Element): string | null {
    return sectionElement.getAttribute('backgroundType');
  }


  updateBulletColors(sectionElement: Element) {
  const backgroundType = this.getSectionBackgroundType(sectionElement);
  if (!backgroundType) return;

  const isActive = sectionElement.id === this.activeSectionId;

  const isDark = backgroundType === 'dark';

  if (isActive) {

    this.activeBulletColorClass = isDark ? 'active-bright' : 'active-dark';
    this.bulletColorClass = isDark ? 'inactive-bright' : 'inactive-dark';
  }
}




scrollTo(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth'
  });
}


ngOnInit() {
  this.observeSections();
}


}






