import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css',
})
export class RecuperarPasswordComponent {
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  private isToastOpen: boolean = false;
  private toastMessage: string = '';
  private buttonControl: boolean = false;
  public emailForm = this.fb.group({
    email: ['', [Validators.required]],
  });

  public checkEmail() {
    if (this.emailForm.invalid) {
      this.setMesageToast('Por favor, ingrese un email válido');
      return;
    }
    this.toggleByForm(1);
    this.loginService
      .checkEmail(this.emailForm.controls['email'].value!)
      .subscribe((res) => {
        switch (res.status) {
          case 202:
            this.loginService
              .sendCodeRecoverPassword(this.emailForm.controls['email'].value!)
              .subscribe((res) => {
                switch (res.status) {
                  case 200:
                    this.loginService.sEmail = this.emailForm.controls['email'].value!;
                    this.toggleByForm(2);
                    this.loginService.setRecoverCode = res.codigo;
                    this.router.navigate(['/loginModule/write-code']);
                    break;
                  default:
                    this.toggleByForm(2);
                    this.setMesageToast('Ha ocurrido un error inesperado');
                }
              });
            break;
          case 404:
            this.toggleByForm(2);
            this.setMesageToast(
              'No se ha encontrado algun usuario con este correo'
            );
            break;
          default:
            this.toggleByForm(2);
            this.setMesageToast('Ha ocurrido un error inesperado');
        }
      });
  }
  private setMesageToast(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;
  }
  private toggleByForm(action: number) {
    switch (action) {
      case 1:
        this.emailForm.disable();
        this.buttonControl = true;
        break;
      case 2:
        this.emailForm.enable();
        this.buttonControl = false;
        break;
    }
  }
  get getisToastOpen() {
    return this.isToastOpen;
  }
  get getToastMessage() {
    return this.toastMessage;
  }
  get getButtonControl() {
    return this.buttonControl;
  }
  set setisToastOpen(isToastOpen: boolean) {
    this.isToastOpen = isToastOpen;
  }
}
