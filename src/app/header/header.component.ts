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
  myEmail = 'nils@example.com'; // Replace with your actual email

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
    this.langAnimate = true;
    setTimeout(() => this.langAnimate = false, 300);
  }
}