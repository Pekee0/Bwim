import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat'
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(
      withFetch()),
    provideToastr({ timeOut: 3000, preventDuplicates: true }), provideFirebaseApp(() => initializeApp({"projectId":"bwim-entertainment","appId":"1:405965504646:web:c5e0931f7dc4b8cabcd107","storageBucket":"bwim-entertainment.firebasestorage.app","apiKey":"AIzaSyDf6uPeaywOIufB3F0P30mYYuTy52EoLyk","authDomain":"bwim-entertainment.firebaseapp.com","messagingSenderId":"405965504646"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    {provide: FIREBASE_OPTIONS, useValue: { 'apiKey' : "AIzaSyDf6uPeaywOIufB3F0P30mYYuTy52EoLyk" ,
      'authDomain': "bwim-entertainment.firebaseapp.com",
      'projectId': "bwim-entertainment",
      'storageBucket': "bwim-entertainment.firebasestorage.app",
      'messagingSenderId': "405965504646",
      'appId': "1:405965504646:web:c5e0931f7dc4b8cabcd107"}}
  ]

};

