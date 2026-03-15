import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { VisibilityService } from '../../services/section-observer/section-observer.service';

@Component({
  selector: 'app-navigation-bullets',
  standalone: true,
  imports: [MatIconModule, NgFor, NgIf, NgClass],
  templateUrl: './navigation-bullets.component.html',
  styleUrl: './navigation-bullets.component.scss'
})
export class NavigationBulletsComponent {
  private visibilityService = inject(VisibilityService);

  // Abgeleitete, unveränderliche Signals aus dem Service
  sections = this.visibilityService.sections;
  activeId = this.visibilityService.activeId;
  activeSectionData = this.visibilityService.activeSectionData;

  // Computed Signal für Active Bullet Farbe basierend auf Dark UI
  activeBulletColorClass = computed(() =>
    this.activeSectionData().darkUi ? 'active-bright' : 'active-dark'
  );

  // Computed Signal für Inactive Bullet Farbe basierend auf Dark UI
  inactiveBulletColorClass = computed(() =>
    this.activeSectionData().darkUi ? 'inactive-dark' : 'inactive-bright'
  );

  /**
   * Glatte Scroll-Navigation zu einer Section
   */
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}






