// header.component.ts
import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { VisibilityService } from '../services/section-observer/section-observer.service';
import { HeaderObserverDirective } from '../services/section-observer/header-obersver.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, NgClass, NgIf, HeaderObserverDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private visibilityService = inject(VisibilityService);

  isMenuOpen = false;
  activeLanguage = 'DE';
  langAnimate = false;

  activeSectionData = this.visibilityService.activeSectionData;
  isHeroActive = this.visibilityService.isHeroActive;

  // Signal das von der Direktive über (pastHero) gesetzt wird
  isPastHero = signal(false);

  headerColorClass = computed(() =>
    this.activeSectionData().darkUi ? 'dark-bg' : 'light-bg'
  );

  onPastHero(value: boolean) {
    this.isPastHero.set(value);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  burgerMenuOpen() { this.isMenuOpen = true; }
  burgerMenuClose() { this.isMenuOpen = false; }

  languageSwitch() {
    this.activeLanguage = this.activeLanguage === 'DE' ? 'EN' : 'DE';
    this.langAnimate = true;
    setTimeout(() => this.langAnimate = false, 300);
  }
}