import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  public dataByTitle = {
    title: 'Recuperacion de contraseña',
    subtitle: 'Crea una nueva contraseña',
  };
  public formPassword:FormGroup = this.fb.group({
    password:['',[Validators.required]],
    passwordTwo:['',[Validators.required]],
  })

  updatePassword() {
    let fecha = new Date().toLocaleDateString();
    const data = {
      password:this.formPassword.controls['password'].value,
      ip:'192.168.1.2',
      fecha: fecha
    }
    this.loginService.updatePassword(this.loginService.gEmail, data).subscribe(data => {
      if (data.status === 202) {
        setTimeout(() => {
          this.router.navigate(['/loginModule/login']);
        }, 1000);
      }
    })

  }
}
