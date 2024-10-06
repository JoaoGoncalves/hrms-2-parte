import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { TruncateLimit } from './shared/directives/truncate.directive';
import { addApiUrlInterceptor } from './shared/interceptors/add-api-url.interceptor';
import { employeePermissionsInterceptor } from './shared/interceptors/employee-permissions.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    //importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([authInterceptor, addApiUrlInterceptor, employeePermissionsInterceptor])
    ),
   /*  {provide: TruncateLimit, useValue: 120} */
  ]
};
