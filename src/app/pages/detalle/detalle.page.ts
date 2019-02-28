import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajeService } from '../../servicios/mensaje/mensaje.service';
import { Mensaje } from '../../modelos/mensaje';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  id: string;
  mensaje: Mensaje;

  constructor(
    private route: ActivatedRoute,
    private mensajeService: MensajeService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.mensajeService.obtenerMensaje(this.id).subscribe(mensaje => {
      this.mensaje = mensaje;
    });
  }

}
