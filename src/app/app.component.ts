import { Component } from '@angular/core';

import { Platform, ToastController, AlertController } from '@ionic/angular';
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
    private router: Router,
    private push: Push,
    private storage: Storage,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushSetup();
      this.platform.backButton.subscribe(() => {
        this.presentAlert();
      })
      this.loginService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: 'Quieres salir de la aplicación?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            navigator['app'].exitApp();
          }
        }, {
          text: 'No',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }
  // configuracion notificaciones push firebase
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
          .then(
            () => console.log('token almacenado'),
            error => console.error(error)
          );
      }
    );

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
