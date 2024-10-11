import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {

  constructor(
    private loginService:LoginService,
    private fb:FormBuilder,
  ){}
  public isNext:boolean = false;
  public emailForm = this.fb.group({
    email: ['',[Validators.required]],
    code:['',[Validators.required]],
  });

  public checkEmail(){
    this.loginService.checkEmail(this.emailForm.controls['email'].value!).subscribe(res => {
      switch(res.status){
        case 202:
          this.loginService.sendCodeRecoverPassword(this.emailForm.controls['email'].value!).subscribe(res => {
            switch(res.status){
              case 200:
                console.log(`Código enviado correctamente, ${res.codigo}`);
                break;
              case 404:
                console.log('El email no se encuentra registrado');
                break;
              default:
                console.log('Error inesperado');
            }
          });
          this.isNext = true;
          break;
        case 404:
          console.log('El email no se encuentra registrado');
          break;
        default:
          console.log('Error inesperado');
      }
    })
  }
}
