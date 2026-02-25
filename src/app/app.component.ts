import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { IconService } from './services/icon-service/icon.service';
import { ObserveSectionDirective } from './services/section-observer/section.observer.directive';
import { NavigationBulletsComponent } from "./user-interface/navigation-bullets/navigation-bullets.component";
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from "./skills/skills.component";
import { MyWorkComponent } from './my-work/my-work.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    ObserveSectionDirective,
    HeaderComponent, 
    HeroSectionComponent, 
    NavigationBulletsComponent, 
    AboutMeComponent, SkillsComponent, 
    MyWorkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';

  constructor(private iconService: IconService) {}
}