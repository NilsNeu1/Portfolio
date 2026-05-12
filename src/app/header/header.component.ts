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

  isHeroActive = this.visibilityService.isHeroActive;

  private headerSectionData = signal<{ darkUi: boolean }>({ darkUi: false });

  headerColorClass = computed(() =>
    this.headerSectionData().darkUi ? 'dark-bg' : 'light-bg'
  );

 onHeaderSectionChange(data: { darkUi: boolean } | null) {
  console.log('Header section change:', data);
  if (data) {
    this.headerSectionData.set({ darkUi: data.darkUi });
  }
}

  goToLink(url: string) { window.open(url, '_blank'); }
  burgerMenuOpen() { this.isMenuOpen = true; }
  burgerMenuClose() { this.isMenuOpen = false; }

  languageSwitch() {
    this.activeLanguage = this.activeLanguage === 'DE' ? 'EN' : 'DE';
    this.langAnimate = true;
    setTimeout(() => this.langAnimate = false, 300);
  }
}