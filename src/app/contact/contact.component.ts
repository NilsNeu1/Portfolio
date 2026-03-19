import { Component } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ObserveSectionDirective, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactData = {
    clientName: "",
    clientEmail:"",
    clientMessage: ""
  }

  onSubmit(){
    console.log(this.contactData)
  }

}
