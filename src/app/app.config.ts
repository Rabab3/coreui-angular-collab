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
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { Title } from '@angular/platform-browser';

import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
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
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxEditorModule,
      SidebarModule,
      DropdownModule,
       ToastrModule.forRoot()
    ),
    IconSetService,
    provideAnimationsAsync(),
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
