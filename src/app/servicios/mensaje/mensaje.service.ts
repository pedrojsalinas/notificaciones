import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Mensaje } from '../../modelos/mensaje';
import { Notificacion } from '../../modelos/notificacion';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  mensajeUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/mensaje/mensaje.php';
  mensajesUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/mensaje/mensajes.php';
  insertarUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/mensaje/insertar.php';
  insertarPersonalUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/insertarPersonal.php';
  actualizarUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/estudiante/actualizar.php';
  personalesUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/enviados.php';

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
  ) { }

  obtenerMensaje(id) {
    return this.http.get<Mensaje>(`${this.mensajeUrl}?id=${id}`, this.httpOptions);
  }
  insertarMensaje(mensaje: Mensaje) {
// tslint:disable-next-line: max-line-length
    this.http.get<Mensaje>(`${this.insertarUrl}?mensaje=${mensaje.mensaje}&cod_asignatura=${mensaje.cod_asignatura}&cod_notificacion=${mensaje.cod_notificacion}&estado=${mensaje.estado}`,
      this.httpOptions)
      .subscribe(message => {
        this.presentToastWithOptions('Mensaje enviado.');
      });
  }
  insertarMensajePersonal(notificacion: Notificacion) {
    this.http.get<Notification>(
// tslint:disable-next-line: max-line-length
      `${this.insertarPersonalUrl}?id=${notificacion.id}&mensaje=${notificacion.mensaje}&emisor=${notificacion.emisor}&receptor=${notificacion.receptor}`,
      this.httpOptions)
      .subscribe(message => {
        this.presentToastWithOptions('Mensaje enviado.');
      });
  }
  obtenerMensajes(id): Observable<Mensaje[]>  {
    return this.http.get<Mensaje[]>(`${this.mensajesUrl}?estudiante=${id}`, this.httpOptions)
      .pipe(
        map(notificaciones => {
          return notificaciones;
        })
      );
  }

  obtenerPersonales(id): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.personalesUrl}?estudiante=${id}`, this.httpOptions)
      .pipe(
        map(notificaciones => {
          return notificaciones;
        })
      );
  }

  actualizarToken(cedula, token) {
    this.http.get(`${this.actualizarUrl}?cedula=${cedula}&token=${token}`, this.httpOptions)
      .subscribe(mensaje => {
        console.log(mensaje);
      });
  }
  async presentToastWithOptions(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

}
