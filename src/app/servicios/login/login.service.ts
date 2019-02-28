import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiante } from '../../modelos/estudiante';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  authenticationState = new BehaviorSubject(false);

  loginUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/estudiante/read_single.php';

  constructor(
    private http: HttpClient,
    private router: Router,
    private nativeStorage: NativeStorage,
    private plt: Platform,
    private storage: Storage
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(estudiante: Estudiante) {
    this.http.get<Estudiante>(`${this.loginUrl}?correo=${estudiante.correo}&cedula=${estudiante.cedula}`, this.httpOptions)
      .subscribe(
        user => {
          console.log('login');
          console.log(user);
          if (user.cedula != null) {
            this.storage.set('nombres', user.nombres);
            this.storage.set('correo', user.correo);
            this.storage.set('cedula', user.cedula).then(() => {
              this.authenticationState.next(true);
              this.router.navigate(['']);
            });
            // this.storage.set('token', user.token);
            // this.nativeStorage.setItem('estudiante',
            //   {
            //     nombres: user.nombres,
            //     cedula: user.cedula,
            //     correo: user.correo,
            //     token: user.token,
            //   })
            //   .then(
            //     () => console.log('estudiante guardado!'),
            //     error => console.error(error)
            //   );
          }
        }
      );
  }
  
  checkToken() {
    this.storage.get('cedula').then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  logout() {
    return this.storage.remove('cedula').then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
