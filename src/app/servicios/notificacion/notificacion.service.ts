import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notificacion, Asignatura } from '../../modelos/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  notificacionesUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/notificaciones.php';
  notificacionUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/notificacion.php';
  asignaturaUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/asignatura.php';

  constructor(
    private http: HttpClient,
  ) { }

  obtenerNotificaciones(id) {
    console.log(`Cedula  ${id}`)
    return this.http.get<Notificacion[]>(`${this.notificacionesUrl}?estudiante=${id}`, this.httpOptions);
  }

  obtenerNotificacion(id) {
    return this.http.get<Notificacion>(`${this.notificacionUrl}?id=${id}`, this.httpOptions);
  }

  obtenerAsignatura(estudiante, componente) {
    return this.http.get<Asignatura>(`${this.asignaturaUrl}?estudiante=${estudiante}&componente=${componente}`, this.httpOptions);
  }

}
