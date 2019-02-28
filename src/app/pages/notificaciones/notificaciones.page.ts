import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../servicios/notificacion/notificacion.service';
import { Notificacion } from '../../modelos/notificacion';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MensajeService } from '../../servicios/mensaje/mensaje.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  cedula: string;

  constructor(
    private notificacionService: NotificacionService,
    private mensajeService: MensajeService,
    // private nativeStorage: NativeStorage,
    private storage: Storage
  ) { }
  notificaciones: Notificacion[] = [];

  ngOnInit() {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    this.storage.get('cedula')
      .then(cedula => {
        this.notificacionService.obtenerNotificaciones(cedula).subscribe(notificaciones => {
          this.notificaciones = notificaciones;
          this.storage.get('token').then(token=>{
            this.mensajeService.actualizarToken(cedula, token);
          });
        });
      });
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
      this.cargarNotificaciones();
    }, 2000);
  }

}
