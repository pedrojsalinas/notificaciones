import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajeService } from '../../servicios/mensaje/mensaje.service';
import { Mensaje } from '../../modelos/mensaje';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';

@Component({
  selector: 'app-mensaje-personal',
  templateUrl: './mensaje-personal.page.html',
  styleUrls: ['./mensaje-personal.page.scss'],
})
export class MensajePersonalPage implements OnInit {

  id: string;
  mensaje: Mensaje;

  constructor(
    private route: ActivatedRoute,
    private notificacionService: NotificacionService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.notificacionService.obtenerPersonalEnviado(this.id).subscribe(mensaje => {
      this.mensaje = mensaje;
    });
  }
}
