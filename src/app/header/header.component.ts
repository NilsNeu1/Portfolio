import { Component, computed, inject, HostListener, signal, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf, isPlatformBrowser } from '@angular/common';
import { VisibilityService } from '../services/section-observer/section-observer.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, NgClass, NgIf, TranslateModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private visibilityService = inject(VisibilityService);
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isMenuOpen = false;
  langAnimate = false;
  myEmail = 'schoenfeld_nils@gmx.de';

  activeLanguage = signal(this.translate.currentLang?.toUpperCase() ?? 'EN');

  constructor() {
    this.translate.onLangChange.subscribe((event) => {
      this.activeLanguage.set(event.lang.toUpperCase());
    });
  }

  isHeroActive = computed(() => this.visibilityService.activeSectionData()?.id === 'hero');
  isNarrowScreen = signal(this.isBrowser ? window.innerWidth < 1024 : false);

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.isNarrowScreen.set(window.innerWidth < 1024);
    }
  }

  headerColorClass = computed(() =>
    this.visibilityService.activeSectionData().darkUi ? 'dark-bg' : 'light-bg'
  );

  showMobileLinks = computed(() => !this.isHeroActive() || this.isNarrowScreen());

  scrollToSection(sectionId: string) {
    if (!this.isBrowser) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.burgerMenuClose();
    }
  }

  copyEmailToClipboard() {
    if (!this.isBrowser) return;
    navigator.clipboard.writeText(this.myEmail).then(() => {
      alert('📋 E-Mail wurde ins Clipboard kopiert!');
    }).catch(err => {
      console.error('Failed to copy email:', err);
    });
    this.burgerMenuClose();
  }

  goToLink(url: string) {
    if (this.isBrowser) window.open(url, '_blank');
  }
  burgerMenuOpen() { this.isMenuOpen = true; }
  burgerMenuClose() { this.isMenuOpen = false; }

  languageSwitch() {
    const newLang = this.activeLanguage() === 'DE' ? 'en' : 'de';
    this.translate.use(newLang);
    if (this.isBrowser) {
      localStorage.setItem('preferredLanguage', newLang);
    }
    this.langAnimate = true;
    setTimeout(() => this.langAnimate = false, 300);
  }
}