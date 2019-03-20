import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../servicios/notificacion/notificacion.service';
import { Notificacion } from '../../modelos/notificacion';
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
  personal = false;

  constructor(
    private notificacionService: NotificacionService,
    private mensajeService: MensajeService,
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
  // detecta cambios
  segmentChanged(ev: any) {
    if (ev.detail.value === 'personal') {
      this.personal = true;
      this.notificaciones = this.notificacionService.obtenerPersonales(this.cedula);
    } else {
      this.personal = false;
      this.notificaciones = this.notificacionService.obtenerNotificaciones(this.cedula);
    }
  }

  cargarNotificaciones() {
    const source = interval(30000);
    source.subscribe(x => { // funcion que se ejecuta cada 30 segundos
      if (this.personal) {
        this.notificaciones = this.notificacionService.obtenerPersonales(this.cedula);
      } else {
        this.notificaciones = this.notificacionService.obtenerNotificaciones(this.cedula);
      }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarNotificaciones();
    }, 2000);
  }

}
