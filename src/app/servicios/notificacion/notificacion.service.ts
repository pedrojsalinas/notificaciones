import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notificacion, Asignatura, Estado } from '../../modelos/notificacion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificacionesPage } from 'src/app/pages/notificaciones/notificaciones.page';

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
  estadoUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/estado.php';
  actualizarUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/actualizarEstado.php';

  constructor(
    private http: HttpClient,
  ) { } z

  // obtenerNotificaciones(id) {
  //   console.log(`Cedula  ${id}`)
  //   return this.http.get<Notificacion[]>(`${this.notificacionesUrl}?estudiante=${id}`, this.httpOptions);
  // }
  obtenerNotificaciones(id): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.notificacionesUrl}?estudiante=${id}`, this.httpOptions)
      .pipe(
        map(notificaciones => {
          return notificaciones;
        })
      );
  }


  obtenerNotificacion(id) {
    return this.http.get<Notificacion>(`${this.notificacionUrl}?id=${id}`, this.httpOptions);
  }

  obtenerAsignatura(estudiante, componente) {
    return this.http.get<Asignatura>(`${this.asignaturaUrl}?estudiante=${estudiante}&componente=${componente}`, this.httpOptions);
  }
  obtenerEstado(estudiante, id) {
    return this.http.get<Estado>(`${this.estadoUrl}?estudiante=${estudiante}&id=${id}`, this.httpOptions);
  }
  actualizarEstado(id) {
    this.http.get(`${this.actualizarUrl}?id=${id}`, this.httpOptions)
      .subscribe(mensaje => {
        console.log(mensaje);
      });
  }
}
