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
  personalesUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/personales.php';
  notificacionUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/notificacion.php';
  personalUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/personal.php';
  personalEnviadoUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/personalEnviado.php';
  asignaturaUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/asignatura.php';
  estadoUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/estado.php';
  actualizarUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/actualizarEstado.php';
  actualizarPersonalUrl = 'https://nelsonpupiales.com/Notificacion/WebServiceMovil/api/notificacion/actualizarEstadoPersonal.php';

  constructor(
    private http: HttpClient,
  ) { }

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

  obtenerPersonales(id): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.personalesUrl}?estudiante=${id}`, this.httpOptions)
      .pipe(
        map(notificaciones => {
          return notificaciones;
        })
      );
  }



  obtenerNotificacion(id) {
    return this.http.get<Notificacion>(`${this.notificacionUrl}?id=${id}`, this.httpOptions);
  }
  obtenerPersonal(id) {
    return this.http.get<Notificacion>(`${this.personalUrl}?id=${id}`, this.httpOptions);
  }

  obtenerPersonalEnviado(id) {
    return this.http.get<Notificacion>(`${this.personalEnviadoUrl}?id=${id}`, this.httpOptions);
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
  actualizarEstadoPersonal(id) {
    this.http.get(`${this.actualizarPersonalUrl}?id=${id}`, this.httpOptions)
      .subscribe(mensaje => {
        console.log(mensaje);
      });
  }
}
