import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-a05a1", "appId": "1:129083896278:web:f1dbd70c12921a35cc7477", "storageBucket": "ring-of-fire-a05a1.appspot.com", "apiKey": "AIzaSyDqIHDeGMoPuGZgjABV_N7dGucMH_KfJSU", "authDomain": "ring-of-fire-a05a1.firebaseapp.com", "messagingSenderId": "129083896278" }))), importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
