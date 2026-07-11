import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import en from './../assets/i18n/en.json';
import de from './../assets/i18n/de.json';

const translations: Record<string, any> = { en, de };

export class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations[lang] ?? translations['en']);
  }
}