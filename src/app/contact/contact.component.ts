import { Component } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ObserveSectionDirective, FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactData = {
    clientName: "",
    clientEmail:"",
    clientMessage: "",
    agreeToPrivacyPolicy: false
  }

  onSubmit(ngForm: NgForm){
if(ngForm.valid && ngForm.submitted){
console.log(this.contactData)
}

  if (ngForm.form.invalid) {
    Object.keys(ngForm.form.controls).forEach(key => {
      if (ngForm.form.controls[key].invalid) {
        ngForm.form.controls[key].reset()
        ngForm.form.controls[key].markAsTouched();
      }
    });
    return;
  }

}
}
