import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../servicios/notificacion/notificacion.service';
import { Notificacion } from '../../modelos/notificacion';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MensajeService } from '../../servicios/mensaje/mensaje.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notificaciones: Observable<Notificacion[]>;
  cedula: string;
  token: string;

  constructor(
    private notificacionService: NotificacionService,
    private mensajeService: MensajeService,
    // private nativeStorage: NativeStorage,
    private storage: Storage
    ) {
      this.cargarNotificaciones();
  }

  ngOnInit() {
    this.storage.get('cedula')
      .then(cedula => {
        this.storage.get('token').then(token => {
          this.cedula = cedula;
          this.mensajeService.actualizarToken(cedula, token);
          this.notificaciones = this.notificacionService.obtenerNotificaciones(cedula);
        });
      });
  }

  cargarNotificaciones() {
    const source = interval(30000);
    source.subscribe(x => { // funcion que se ejecuta cada 30 segundos
      this.notificaciones = this.notificacionService.obtenerNotificaciones(this.cedula);
    });
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
      this.cargarNotificaciones();
    }, 2000);
  }

}
