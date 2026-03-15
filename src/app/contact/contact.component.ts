import { Component } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ObserveSectionDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
