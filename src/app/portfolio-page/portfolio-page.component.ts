import { Component } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { HeaderComponent } from '../header/header.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { NavigationBulletsComponent } from '../user-interface/navigation-bullets/navigation-bullets.component';
import { SkillsComponent } from '../skills/skills.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { MyWorkComponent } from '../my-work/my-work.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    ObserveSectionDirective,
    HeaderComponent,
    HeroSectionComponent,
    NavigationBulletsComponent,
    AboutMeComponent,
    SkillsComponent,
    MyWorkComponent,
    ContactComponent,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss'
})
export class PortfolioPageComponent {

}
