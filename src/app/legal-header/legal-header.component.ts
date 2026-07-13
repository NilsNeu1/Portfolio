import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-legal-header',
  standalone: true,
  imports: [RouterModule, TranslateModule, MatIconModule],
  templateUrl: './legal-header.component.html',
  styleUrl: './legal-header.component.scss'
})
export class LegalHeaderComponent {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  langAnimate = false;
  activeLanguage = signal(this.translate.currentLang?.toUpperCase() ?? 'EN');

  constructor() {
    this.translate.onLangChange.subscribe((event) => {
      this.activeLanguage.set(event.lang.toUpperCase());
    });
  }

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