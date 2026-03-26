import { Component, inject } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ObserveSectionDirective, FormsModule, NgIf, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})


export class ContactComponent {

  http = inject(HttpClient);

  mailTest = true;

  contactData = {
    clientName: "",
    clientEmail: "",
    clientMessage: "",
    agreeToPrivacyPolicy: false
  }

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.form.invalid) {
      this.alertUserError(ngForm);
      return;
    }

    this.sentContactForm(ngForm);
    console.log("worked" , this.contactData)
  }

  alertUserError(ngForm: NgForm) {
    Object.keys(ngForm.form.controls).forEach(key => {
      if (ngForm.form.controls[key].invalid) {
        ngForm.form.controls[key].reset();
        ngForm.form.controls[key].markAsTouched();
      }
    });
  }

  sentContactForm(ngForm: NgForm) {
    this.http.post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: () => ngForm.resetForm(),
        error: (error) => console.error(error),
        complete: () => console.info('send post complete'),
      });
  }

}