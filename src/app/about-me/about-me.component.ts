import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MatIconModule, ObserveSectionDirective, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  sectionId = 'about';

isHovered: boolean = false;

onHoverStart(){
this.isHovered = true;

}

onHoverEnd(){
this.isHovered = false;

}

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
