import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-code',
  templateUrl: './write-code.component.html',
  styleUrl: './write-code.component.css',
})
export class WriteCodeComponent {
  constructor(
    private loginService:LoginService,
    private fb: FormBuilder,
    private router:Router,
  ) {}

  private isToastOpen: boolean = false;
  private toastMessage: string = '';


  public dataByTitle = {
    title:'Recuperacion de contraseña',
    subtitle:'Escribe el codigo que se a enviado a tu correo'
  }
  public codeForm = this.fb.group({
    code:['', [Validators.required]]
  })
  canceledRecover(){
    this.loginService.setRecoverCode = '';
    this.router.navigate(['/loginModule/recuperar-password']);
  }
  checkCode(){
    if(this.codeForm.invalid){
      this.setMesageToast('El codigo es requerido');
      return;
    }
    if(this.codeForm.controls['code'].value === this.loginService.recoverCode){
      this.router.navigate([`/loginModule/change-password/${this.loginService.gEmail}`]);
    }
    else{
      this.setMesageToast('El codigo es incorrecto');
    }
  }

  private setMesageToast(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;
  }
  get getisToastOpen() {
    return this.isToastOpen;
  }
  get getToastMessage() {
    return this.toastMessage;
  }
  set setisToastOpen(isToastOpen: boolean) {
    this.isToastOpen = isToastOpen;
  }
}
