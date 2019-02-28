import { Component, OnInit } from '@angular/core';
import { MensajeService } from './../../servicios/mensaje/mensaje.service';
import { Mensaje } from '../../modelos/mensaje';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  constructor(
    private mensajeService: MensajeService,
    private storage: Storage,
  ) {

  }
  mensajes: Mensaje[] = [];


  ngOnInit() {
    this.cargarMensajes();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarMensajes();
    }, 2000);
  }

  cargarMensajes() {
    this.storage.get('cedula')
      .then(cedula => {
        this.mensajeService.obtenerMensajes(cedula).subscribe(mensajes => {
          this.mensajes = mensajes;
        });
      });
  }
}
