import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [MatIconModule, ObserveSectionDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  sectionId = 'hero';

}
