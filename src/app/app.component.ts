import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { LoginService } from './servicios/login/login.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    // private nativeStorage: NativeStorage,
    private router: Router,
    private push: Push,
    private storage: Storage,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushSetup();

      this.loginService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/login']);
        }
      });


    //   this.nativeStorage.getItem('estudiante')
    //     .then(estudiante => {
    //       if (estudiante.cedula) {
    //         this.router.navigate(['']);
    //       } else {
    //         this.router.navigate(['/login']);
    //       }
    //     });
    });
  }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '948277858907'
      },
      ios: {
        alert: 'true',
        badge: true,
      sound: 'false'
      }
    }

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe(
      (registration: any) => {
        this.storage.set('token', registration.registrationId)
        // this.nativeStorage.setItem('estudiante',
        //   {
        //     token: registration.registrationId,
        //   })
          .then(
            () => console.log('token almacenado'),
            error => console.error(error)
          );
      }
    );

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
