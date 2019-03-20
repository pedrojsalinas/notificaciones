import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from '../../servicios/notificacion/notificacion.service';
import { Notificacion } from '../../modelos/notificacion';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MensajePersonalPage } from '../modales/mensaje-personal/mensaje-personal.page';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  id: string;
  notificacion: Notificacion;
  cedula: string;

  constructor(
    private route: ActivatedRoute,
    private notificacionService: NotificacionService,
    public modalController: ModalController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.notificacionService.obtenerPersonal(this.id).subscribe(notificacion => {
      this.notificacion = notificacion;
      this.storage.get('cedula')
        .then(cedula => {
          this.cedula = cedula;
          if (notificacion.estado === '0') {
            console.log(notificacion);
            this.notificacionService.actualizarEstadoPersonal(this.id);
          }
        });
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MensajePersonalPage,
      componentProps: {
        id: this.id,
        cedula: this.cedula,
        docente: this.notificacion.cedula
      }
    });
    return await modal.present();
  }
}
