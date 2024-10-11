import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(
    private loginService:LoginService,
    private fb: FormBuilder,
    private router:Router,
  ){}

  public loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required]],
  })

  public loginAction(){
    if(this.loginForm.invalid){
      console.log("no llenos")
      return
    }
    const dataByLogin = {
      ...this.loginForm.value,
      ip:'192.143.2.1',
      fecha:"2020-21-10"
    }
    this.loginService.login(dataByLogin).subscribe(resp => {
      switch(resp.status){
        case 200:
          console.log('Login correcto');
          localStorage.setItem('token',resp.token);
          this.loginForm.reset();
          this.router.navigate(['/home'])
          break;
        case 400:
          console.log('Usuario o contraseña incorrectos');
          break;
        case 409:
          console.log('Limite de intentos');
          break;
        default:
          console.log('Error inesperado');
      }
    })
  }
}
