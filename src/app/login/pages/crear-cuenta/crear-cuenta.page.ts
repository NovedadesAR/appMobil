import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.css'],
})
export class CrearCuentaPage{

  constructor(private fb:FormBuilder) { }

  public formCreate:FormGroup = this.fb.group({
    name:['',[Validators.required]],
    lastname:['',[Validators.required]],
    motherLastname:['',[Validators.required]],
    gender:['',[Validators.required]],
    birthdate:['',[Validators.required]],
    question:['',[Validators.required]],
    email:['',[Validators.required]],
    answer:['',[Validators.required]],
    cellphone:['',[Validators.required]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
    
  })
  public isNext:boolean = false;
}
