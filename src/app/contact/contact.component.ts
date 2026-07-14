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

  // private readonly emailPattern = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@(gmail|gmx|web|outlook|yahoo|hotmail|protonmail|icloud)\.(com|de|net|org)$/;
  private readonly emailPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@(gmail|gmx|web|outlook|yahoo|hotmail|protonmail|icloud)\.(com|de|net|org)$/;


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

  // isValidName(control: NgModel): void {
  //   const value = control.value || '';
  //   if (value.trim().length < 2) {
  //     control.control.setErrors({ minlength: true });
  //   } else {
  //     control.control.setErrors(null);
  //   }
  // }


// isValidEmail(control: NgModel): void {
//   const rawValue: unknown = control.value;
//   const value: string = typeof rawValue === 'string' ? rawValue.trim().toLowerCase() : '';

//   control.control.setErrors(this.emailPattern.test(value) ? null : { invalidFormat: true });
// }


isValidName(control: NgModel): void {
  const rawValue = control.value || '';
  const value = rawValue.trim();

  // 1. Keine Leerzeichen am Anfang
  if (rawValue.startsWith(' ')) {
    control.control.setErrors({ leadingSpace: true });
    return;
  }

  // 2. Mindestlänge (mindestens 2 Buchstaben)
  if (value.replace(/\s+/g, '').length < 2) {
    control.control.setErrors({ minlength: true });
    return;
  }

  // 3. Keine doppelten Leerzeichen
  if (value.includes('  ')) {
    control.control.setErrors({ doubleSpace: true });
    return;
  }

  // 4. Nur Buchstaben + Leerzeichen (für lange Namen)
  //    Unterstützt Akzente: áéíóúüñÁÉÍÓÚÜÑ
  const namePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[- ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

  if (!namePattern.test(value)) {
    control.control.setErrors({ invalidFormat: true });
    return;
  }

  // 5. Alles ok
  control.control.setErrors(null);
}


isValidEmail(control: NgModel): void {
  const rawValue: unknown = control.value;
  const value: string = typeof rawValue === 'string'
    ? rawValue.trim().toLowerCase()
    : '';

  // 1. Leere Eingabe → required error
  if (!value) {
    control.control.setErrors({ required: true });
    return;
  }

  // 2. Struktur prüfen
  if (!this.emailPattern.test(value)) {
    control.control.setErrors({ invalidFormat: true });
    return;
  }

  // 3. Zusätzliche Sicherheitschecks (noch strenger)
  if (this.hasIllegalSequences(value)) {
    control.control.setErrors({ invalidFormat: true });
    return;
  }

  // 4. Alles ok
  control.control.setErrors(null);
}


private hasIllegalSequences(email: string): boolean {
  // Keine doppelten Punkte, Unterstriche oder Bindestriche
  if (email.includes('..') || email.includes('__') || email.includes('--')) {
    return true;
  }

  // Keine Sonderzeichen im Namen
  const name = email.split('@')[0];
  if (/[^a-zA-Z0-9._-]/.test(name)) {
    return true;
  }

  // Keine Subdomains
  const domain = email.split('@')[1];
  if (domain.split('.').length !== 2) {
    return true;
  }

  return false;
}

isValidMessage(control: NgModel): void {
  const rawValue: unknown = control.value;
  const value: string = typeof rawValue === 'string' ? rawValue : '';

  // 1. Komplett leer oder nur Leerzeichen
  if (value.trim().length === 0) {
    control.control.setErrors({ empty: true });
    return;
  }

  // 2. Leerzeichen am Anfang (nur relevant, wenn noch echter Inhalt da ist)
  if (value.startsWith(' ')) {
    control.control.setErrors({ leadingSpace: true });
    return;
  }

  // 3. Alles ok
  control.control.setErrors(null);
}



  // isValidMessage(value: string): boolean {
  //   return value.trim().length > 0;
  // }

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

  const messageControl = ngForm.form.get('clientMessage');
  if (messageControl?.invalid) {
    messageControl.reset();
    messageControl.markAsTouched();
    messageControl.setErrors({ whitespace: true });
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