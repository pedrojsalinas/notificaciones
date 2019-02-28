import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombres: string;
  cedula: string;
  correo: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.obtenerInfoEstudiante();
  }

  cerrarSesion() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  obtenerInfoEstudiante() {
    this.storage.get('nombres')
      .then(nombres => {
        this.nombres = nombres;
      });
    this.storage.get('cedula')
      .then(cedula => {
        this.cedula = cedula;
      });
    this.storage.get('correo')
      .then(correo => {
        this.correo = correo;
      });
  }
}
