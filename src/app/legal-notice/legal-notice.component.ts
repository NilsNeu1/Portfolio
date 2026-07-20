import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LegalHeaderComponent } from '../legal-header/legal-header.component';
import { HeaderComponent } from "../header/header.component";
import { VisibilityService } from './../services/section-observer/section-observer.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [TranslateModule, RouterModule, LegalHeaderComponent, HeaderComponent, FooterComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})

export class LegalNoticeComponent implements OnInit {
  private readonly visibilityService = inject(VisibilityService);

  ngOnInit(): void {
  console.log('LegalNotice ngOnInit, activeId vorher:', this.visibilityService.activeId());
  this.visibilityService.setActive('legal-notice');
  console.log('activeId nachher:', this.visibilityService.activeId());
  }
}