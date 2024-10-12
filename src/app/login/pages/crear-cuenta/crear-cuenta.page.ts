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

  public ValidFirtsForm(){
    if(
      this.formCreate.controls['name'].invalid &&
      this.formCreate.controls['lastname'].invalid &&
      this.formCreate.controls['motherLastname'].invalid &&
      this.formCreate.controls['gender'].invalid &&
      this.formCreate.controls['birthdate'].invalid 
    )
    return alert('No validado')
    this.isNext=true
  }

  public ValidSecondForm(){
    if(
      this.formCreate.invalid
    )
    return alert('Llena bien tus datos')
  }


}
