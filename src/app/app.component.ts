import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { IconService } from './services/icon-service/icon.service';
import { NavigationBulletsComponent } from "./user-interface/navigation-bullets/navigation-bullets.component";
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from "./skills/skills.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HeroSectionComponent, NavigationBulletsComponent, AboutMeComponent, SkillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';

  constructor(private iconService: IconService) {}
}