import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import{ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
    
  
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(
      environment.firebaseConfig)),
    //provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
  /*providers: [
    provideFirebaseApp(() => initializeApp(
      {"projectId":"fire-crud-5b7f3",
        "appId":"1:605418408424:web:195be44b336636b673fc5d",
        "storageBucket":"fire-crud-5b7f3.appspot.com",
        "apiKey":"AIzaSyAlZnLLG2kvI14Eh9Av7rf1HPBg9dc5BjY",
        "authDomain":"fire-crud-5b7f3.firebaseapp.com",
        "messagingSenderId":"605418408424"
      })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})*/
export class AppModule { }
