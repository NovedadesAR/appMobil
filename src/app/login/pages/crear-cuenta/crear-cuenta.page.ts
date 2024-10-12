import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.css'],
})
export class CrearCuentaPage {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}

  private isToastOpen:boolean = false;
  private toastMessage:string = '';
  private buttonControl:boolean = false;

  public dataByTitleComponent = {
    title: 'Registrate',
    subtitle: 'Crea una cuenta y lleva lo mejos de la moda.',
  };

  public formCreate: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    motherLastname: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    question: ['', [Validators.required]],
    email: ['', [Validators.required]],
    answer: ['', [Validators.required]],
    cellphone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
  });

  public ValidSecondForm() {
    if (this.formCreate.invalid) {
      this.setMesageToast('Llena correctamente los campos');
      return
    }
    this.toggleByForm(1);
    this.loginService.createUser(this.formCreate.value).subscribe((res) => {
      switch(res.status){
        case 202:
          this.setMesageToast('Cuenta creada correctamente');
          setTimeout(() => {
            this.toggleByForm(2);
            this.formCreate.reset();
            this.router.navigate(['/loginModule/login']);
          }, 2000);
          break;
        case 409:
          this.setMesageToast('El correo o numero ya estan registrados');
          this.toggleByForm(2);
          break;
        default:
          this.setMesageToast('Error inesperado');
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
        this.formCreate.disable();
        this.buttonControl = true;
        break;
        case 2:
          this.formCreate.enable();
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
