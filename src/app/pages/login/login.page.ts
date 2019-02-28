import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
  ) {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      cedula: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  login() {
    this.loginService.login(this.loginForm.value);
  }
}
