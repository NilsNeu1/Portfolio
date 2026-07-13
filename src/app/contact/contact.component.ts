import { Component, inject } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ObserveSectionDirective, FormsModule, NgIf, RouterLink, TranslateModule, MatIcon],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  http = inject(HttpClient);

  submitStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  contactData = {
    clientName: '',
    clientEmail: '',
    clientMessage: '',
    agreeToPrivacyPolicy: false
  };

  post = {
    endPoint: 'https://nils-neumann.developerakademie.net/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
      },
    },
  };

  isValidName(control: NgModel): void {
    const value = control.value || '';
    if (value.trim().length < 2) {
      control.control.setErrors({ minlength: true });
    } else {
      control.control.setErrors(null);
    }
  }

//  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

isValidEmail(control: NgModel): void {
  const rawValue: unknown = control.value;
  const value: string = typeof rawValue === 'string' ? rawValue.trim().toLowerCase() : '';

  control.control.setErrors(this.emailPattern.test(value) ? null : { invalidFormat: true });
}

  isValidMessage(value: string): boolean {
    return value.trim().length > 0;
  }

  alertUserError(ngForm: NgForm) {
    Object.keys(ngForm.form.controls).forEach(key => {
      const control = ngForm.form.controls[key];
      if (control.invalid) {
        control.reset();
        control.markAsTouched();
      }
    });
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.form.invalid) {
      this.alertUserError(ngForm);
      return;
    }

    if (!this.isValidMessage(this.contactData.clientMessage)) {
      ngForm.form.controls['clientMessage'].reset();
      ngForm.form.controls['clientMessage'].markAsTouched();
      ngForm.form.controls['clientMessage'].setErrors({ whitespace: true });
      return;
    }

    this.sendContactForm(ngForm);
  }

  markAllTouched(ngForm: NgForm) {
    Object.keys(ngForm.form.controls).forEach(key => {
      ngForm.form.controls[key].markAsTouched();
    });
  }

  // sendContactForm(ngForm: NgForm) {
  //   this.submitStatus = 'loading';

  //   this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
  //     .subscribe({
  //       next: () => {
  //         this.submitStatus = 'success';
  //         ngForm.resetForm();
  //         setTimeout(() => this.submitStatus = 'idle', 8000);
  //       },
  //       error: () => {
  //         this.submitStatus = 'error';
  //         setTimeout(() => this.submitStatus = 'idle', 8000);
  //       },
  //     });
  // }



  // 

  sendContactForm(ngForm: NgForm) {
  this.submitStatus = 'loading';

  // Simulierter Versand, da der Server keine PHP-Dateien ausführen kann.
  // Echten Versand hier wieder aktivieren, sobald ein funktionsfähiger Endpoint verfügbar ist.
  setTimeout(() => {
    this.submitStatus = 'success';
    ngForm.resetForm();
    setTimeout(() => this.submitStatus = 'idle', 8000);
  }, 800);}
}