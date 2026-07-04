import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IconService } from './services/icon-service/icon.service';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LegalNoticeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
  private translate = inject(TranslateService);

  constructor(
    private iconService: IconService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.resetScrollOnNavigation());
  }

  private resetScrollOnNavigation(): void {
    const el = this.elementRef.nativeElement;
    el.scrollTop = 0;
    el.style.display = 'none';
    void el.offsetHeight; // erzwingt Reflow
    el.style.display = 'block';
  }
}