import { Component, computed, inject, HostListener, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { VisibilityService } from '../services/section-observer/section-observer.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, NgClass, NgIf, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private visibilityService = inject(VisibilityService);
  private translate = inject(TranslateService);

  isMenuOpen = false;
  activeLanguage = 'DE';
  langAnimate = false;
  myEmail = 'nils@example.com';

 isHeroActive = computed(() => this.visibilityService.activeSectionData()?.id === 'hero');
  isNarrowScreen = signal(window.innerWidth < 1024);

  @HostListener('window:resize')
  onResize() {
    this.isNarrowScreen.set(window.innerWidth < 1024);
  }

  headerColorClass = computed(() =>
    this.visibilityService.activeSectionData().darkUi ? 'dark-bg' : 'light-bg'
  );

  showMobileLinks = computed(() => !this.isHeroActive() || this.isNarrowScreen());

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.burgerMenuClose();
    }
  }

  copyEmailToClipboard() {
    navigator.clipboard.writeText(this.myEmail).then(() => {
      alert('📋 E-Mail wurde ins Clipboard kopiert!');
    }).catch(err => {
      console.error('Failed to copy email:', err);
    });
    this.burgerMenuClose();
  }

  goToLink(url: string) { window.open(url, '_blank'); }
  burgerMenuOpen() { this.isMenuOpen = true; }
  burgerMenuClose() { this.isMenuOpen = false; }

  languageSwitch() {
    this.activeLanguage = this.activeLanguage === 'DE' ? 'EN' : 'DE';
    this.translate.use(this.activeLanguage.toLowerCase()); // NGX erwartet lowercase
    this.langAnimate = true;
    setTimeout(() => this.langAnimate = false, 300);
  }
}