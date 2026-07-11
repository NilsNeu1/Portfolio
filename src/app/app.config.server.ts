import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TranslateLoader } from '@ngx-translate/core';
import { appConfig } from './app.config';
import { ServerTranslateLoader } from './server-translate-loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: TranslateLoader, useClass: ServerTranslateLoader }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);