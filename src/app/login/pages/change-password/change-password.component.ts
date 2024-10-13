import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private loginService: LoginService) {}
  public dataByTitle = {
    title: 'Recuperacion de contraseña',
    subtitle: 'Crea una nueva contraseña',
  };
}
