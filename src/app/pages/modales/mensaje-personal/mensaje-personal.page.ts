import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../../servicios/notificacion/notificacion.service';
import { MensajeService } from '../../../servicios/mensaje/mensaje.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-mensaje-personal',
  templateUrl: './mensaje-personal.page.html',
  styleUrls: ['./mensaje-personal.page.scss'],
})
export class MensajePersonalPage implements OnInit {
  mensajeForm: FormGroup;
  @Input() id: string;
  @Input() cedula: string;
  @Input() docente: string;
  asignatura: string;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private mensajeService: MensajeService,
  ) { }

  ngOnInit() {
    this.mensajeForm = this.fb.group({
      mensaje: ['', Validators.required],
    });
  }
  cerrar() {
    this.modalController.dismiss();
  }
  enviarMensaje() {
    const mensaje = {
      id: this.id,
      mensaje: this.mensajeForm.value.mensaje,
      emisor: this.cedula,
      receptor: this.docente,
    };
    this.mensajeService.insertarMensajePersonal(mensaje);
    this.modalController.dismiss();
  }
}
