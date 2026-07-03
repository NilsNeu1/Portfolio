import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IconService } from './services/icon-service/icon.service';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';

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

  constructor(private iconService: IconService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en'); 
  }
}