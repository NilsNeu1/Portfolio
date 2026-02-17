import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from "@angular/common";
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-navigation-bullets',
  standalone: true,
  imports: [MatIconModule, NgIf, NgFor, NgClass],
  templateUrl: './navigation-bullets.component.html',
  styleUrl: './navigation-bullets.component.scss'
})
export class NavigationBulletsComponent {

  activeSectionId: string | null = null;
  sections: { id: string }[] = [];
  bulletColorClass: string = '';
  activeBulletColorClass: string = '';

  private observeSections() {

    const sections = Array.from(document.querySelectorAll('section[nav]'))
      .filter(section => !section.classList.contains('header'));

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






