import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"aplicaciones-moviles-clases","appId":"1:80636065798:web:4b5e48ce0b1943b682ab87","storageBucket":"aplicaciones-moviles-clases.firebasestorage.app","apiKey":"AIzaSyCIUFnhYToVPmsFQ7HEmycxWNH9FFZQf1Y","authDomain":"aplicaciones-moviles-clases.firebaseapp.com","messagingSenderId":"80636065798","measurementId":"G-2XCZ9D19M2"})), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}
