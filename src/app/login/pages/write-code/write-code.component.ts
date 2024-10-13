import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-write-code',
  templateUrl: './write-code.component.html',
  styleUrl: './write-code.component.css',
})
export class WriteCodeComponent{
  constructor(private loginService:LoginService) {}
  public dataByTitle = {
    title:'Recuperacion de contraseña',
    subtitle:'Escribe el codigo que se a enviado a tu correo'
  }
}
