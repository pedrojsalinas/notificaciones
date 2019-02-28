import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../../servicios/notificacion/notificacion.service';
import { MensajeService } from '../../../servicios/mensaje/mensaje.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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
    private nativeStorage: NativeStorage,
  ) { }

  ngOnInit() {
    this.mensajeForm = this.fb.group({
      mensaje: ['', Validators.required],
    });
    this.nativeStorage.getItem('estudiante')
      .then((estudiante) => {
        this.notificacionService.obtenerAsignatura(estudiante.cedula, this.paralelo).subscribe(paralelo => {
          this.asignatura = paralelo.asignatura;
        });
      });
  }
  cerrar() {
    this.modalController.dismiss();
  }
  enviarMensaje() {
    const mensaje = {
      mensaje: this.mensajeForm.value.mensaje,
      cod_asignatura: this.asignatura
    };
    this.mensajeService.insertarMensaje(mensaje);
    this.modalController.dismiss();
  }
}
