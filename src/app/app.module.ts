import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './servicios/login/login.service';
import { NotificacionService } from './servicios/notificacion/notificacion.service';
import { HttpClientModule } from '@angular/common/http';
import { MensajePage } from './pages/modales/mensaje/mensaje.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Push } from '@ionic-native/push/ngx';
@NgModule({
  declarations: [
    AppComponent,
    MensajePage],
  entryComponents: [MensajePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService,
    NotificacionService,
    // NativeStorage,
    Push
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
