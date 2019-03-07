import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../../servicios/notificacion/notificacion.service';
import { MensajeService } from '../../../servicios/mensaje/mensaje.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: ['./mensaje.page.scss'],
})
export class MensajePage implements OnInit {

  mensajeForm: FormGroup;
  @Input() id: number;
  @Input() paralelo: string;
  asignatura: string;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private notificacionService: NotificacionService,
    private mensajeService: MensajeService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.mensajeForm = this.fb.group({
      mensaje: ['', Validators.required],
    });
    this.storage.get('cedula')
      .then(cedula => {
        this.notificacionService.obtenerAsignatura(cedula, this.paralelo).subscribe(paralelo => {
          this.asignatura = paralelo.asignatura;
        });
      });
  }
  cerrar() {
    this.modalController.dismiss();
  }
  enviarMensaje() {
    const mensaje = {
      cod_notificacion: this.id,
      mensaje: this.mensajeForm.value.mensaje,
      cod_asignatura: this.asignatura,
      estado: 0,
    };
    this.mensajeService.insertarMensaje(mensaje);
    this.modalController.dismiss();
  }
}
