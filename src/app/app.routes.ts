import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';

export const routes: Routes = [
    {
        path: '',
        component: PortfolioPageComponent
    },

    {
        path: 'legal-notice',
        component: LegalNoticeComponent
    }
];
