import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from '../../servicios/notificacion/notificacion.service';
import { Notificacion } from '../../modelos/notificacion';
import { ModalController } from '@ionic/angular';
import { MensajePage } from '../modales/mensaje/mensaje.page';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  id: string;
  notificacion: Notificacion;

  constructor(
    private route: ActivatedRoute,
    private notificacionService: NotificacionService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.notificacionService.obtenerNotificacion(this.id).subscribe(notificacion => {
      this.notificacion = notificacion;
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MensajePage,
      componentProps: {
        id: this.id,
        paralelo: this.notificacion.paralelo
      }
    });
    return await modal.present();
  }
}
