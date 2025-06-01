import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
  withHashLocation
} from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { Title } from '@angular/platform-browser';

import { routes } from './app.routes';

export const API_BASE_URL = 'http://localhost:8080/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(
      HttpClientModule,
      SidebarModule,
      DropdownModule
    ),
    IconSetService,
    provideAnimationsAsync(),

    // Fixe le titre de la page
    {
      provide: Title,
      useFactory: () => {
        const title = new Title(document);
        title.setTitle('Base de connaissance');
        return title;
      }
    }
  ]
};
