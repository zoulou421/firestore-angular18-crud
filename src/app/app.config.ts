import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig = {
  providers: [
    // Initialize Firebase with the configuration from environment.ts
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    
    // Provide Firebase Authentication service
    //provideAuth(() => getAuth()),


    // Provide Firebase Firestore service
    provideFirestore(() => getFirestore())
    
    // You can add more Firebase services here (e.g., Firestore, Storage)
  ],
};
