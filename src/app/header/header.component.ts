import { Component, computed, inject, HostListener, signal, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf, isPlatformBrowser } from '@angular/common';
import { VisibilityService } from '../services/section-observer/section-observer.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

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
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(this.platformId);
  private mailCopyTimeout?: ReturnType<typeof setTimeout>;
  private scrollAfterNavTimeout?: ReturnType<typeof setTimeout>;

  isMenuOpen = false;
  langAnimate = false;
  mailCopied = signal(false);
  myEmail = 'schoenfeld_nils@gmx.de';

  activeLanguage = signal(this.translate.currentLang?.toUpperCase() ?? 'EN');
  currentUrl = signal(this.router.url);

  constructor() {
    this.translate.onLangChange.subscribe((event) => {
      this.activeLanguage.set(event.lang.toUpperCase());
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }

  isHeroActive = computed(() => this.visibilityService.activeSectionData()?.id === 'hero');
  isNarrowScreen = signal(this.isBrowser ? window.innerWidth < 1024 : false);
  isLegalNoticeActive = computed(() => this.currentUrl().includes('legal-notice'));

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

    const isHome = this.router.url === '/' || this.router.url.startsWith('/#');

    if (isHome) {
      this.scrollToElement(sectionId);
      this.burgerMenuClose();
      return;
    }

    this.router.navigate(['/']).then(() => {
      clearTimeout(this.scrollAfterNavTimeout);
      this.scrollAfterNavTimeout = setTimeout(() => {
        this.scrollToElement(sectionId);
      }, 100);
    });
    this.burgerMenuClose();
  }

  private scrollToElement(sectionId: string) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

 copyEmailToClipboard() {
  if (!this.isBrowser) return;
  navigator.clipboard.writeText(this.myEmail).then(() => {
    this.showMailCopiedHint();
  }).catch(err => {
    console.error('Failed to copy email:', err);
  });
}

private showMailCopiedHint() {
  this.mailCopied.set(true);
  clearTimeout(this.mailCopyTimeout);
  this.mailCopyTimeout = setTimeout(() => {
    this.mailCopied.set(false);
    this.burgerMenuClose();
  }, 2000);
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

    ngOnDestroy() {
    clearTimeout(this.mailCopyTimeout);
    clearTimeout(this.scrollAfterNavTimeout);
  }
}