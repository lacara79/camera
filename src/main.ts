import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { enableProdMode as angularEnableProdMode } from '@angular/core';
import { environment } from './environments/environment.prod';

import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});


defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}
function enableProdMode() {
  angularEnableProdMode();
}
