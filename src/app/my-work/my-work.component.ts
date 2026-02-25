import { Component, Input } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [ObserveSectionDirective],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  sectionId = 'projects';

}
