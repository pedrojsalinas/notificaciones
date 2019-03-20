import { Component, OnInit } from '@angular/core';
import { MensajeService } from './../../servicios/mensaje/mensaje.service';
import { Mensaje } from '../../modelos/mensaje';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {
  cedula: any;
  personal = false;

  constructor(
    private mensajeService: MensajeService,
    private storage: Storage,
  ) {
    this.cargarNotificaciones();
  }
  mensajes: Observable<Mensaje[]>;


  ngOnInit() {
    this.storage.get('cedula')
      .then(cedula => {
        this.storage.get('token').then(token => {
          this.cedula = cedula;
          this.mensajes = this.mensajeService.obtenerMensajes(cedula);
        });
      });
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarNotificaciones();
    }, 2000);
  }

  cargarNotificaciones() {
    const source = interval(30000);
    source.subscribe(x => { // funcion que se ejecuta cada 30 segundos
      if (this.personal) {
        this.mensajes = this.mensajeService.obtenerPersonales(this.cedula);
      } else {
        this.mensajes = this.mensajeService.obtenerMensajes(this.cedula);
      }
    });
  }
  segmentChanged(ev: any) {
    if (ev.detail.value === 'personal') {
      this.personal = true;
      this.mensajes = this.mensajeService.obtenerPersonales(this.cedula);
    } else {
      this.personal = false;
      this.mensajes = this.mensajeService.obtenerMensajes(this.cedula);
    }
  }

}
