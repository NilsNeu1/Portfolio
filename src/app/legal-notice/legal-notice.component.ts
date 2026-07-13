import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LegalHeaderComponent } from '../legal-header/legal-header.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [TranslateModule, RouterModule, LegalHeaderComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {}