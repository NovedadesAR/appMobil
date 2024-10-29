import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  private isToastOpen:boolean = false;
  private toastMessage:string = '';
  private buttonControl:boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public dataByTitleComponent = {
    title: 'Mi cuenta',
    subtitle: 'Inicia sesion para poder acceder a tu cuenta y mas funciones.',
  };

  public loginAction() {
    if (this.loginForm.invalid) {
      this.setMesageToast('LLena correctamente los campos');
      return;
    }
    this.toggleByForm(1);
    const dataByLogin = {
      ...this.loginForm.value,
      ip: '192.143.2.1',
      fecha: '2020-21-10',
    };
    this.loginService.login(dataByLogin).subscribe((resp) => {
      switch (resp.status) {
        case 200:
          localStorage.setItem('token', resp.token);
          this.loginForm.reset();
          this.setMesageToast('Bienvenido');
          setTimeout(() => {
            this.toggleByForm(1);
            this.router.navigate(['/home']);
          }, 2000);
          break;
        case 400:
          this.setMesageToast('Correo o contraseña incorrectos');
          this.toggleByForm(2);
          break;
        case 409:
          this.setMesageToast('Limite de intentos alcanzados');
          this.toggleByForm(2);
          break;
        default:
          this.setMesageToast('Error inesperado si el problema persiste comuniquese con soporte');
          this.toggleByForm(2);
          break;
      }
    });
  }
  private setMesageToast(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;
  }
  private toggleByForm(action:number){
    switch(action){
      case 1:
        this.loginForm.disable();
        this.buttonControl = true;
        break;
        case 2:
          this.loginForm.enable();
          this.buttonControl = false;
        break;
    }
  }
  get getisToastOpen(){
    return this.isToastOpen;
  }
  get getToastMessage(){
    return this.toastMessage;
  }
  get getButtonControl(){
    return this.buttonControl;
  }
  set setisToastOpen(isToastOpen:boolean){
    this.isToastOpen = isToastOpen;
  }

}
