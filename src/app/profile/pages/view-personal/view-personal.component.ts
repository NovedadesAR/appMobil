import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RespPersonal } from '../../interfaces/DataProfile.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../../interfaces/Form.interface';

@Component({
  selector: 'app-view-personal',
  templateUrl: './view-personal.component.html',
  styleUrl: './view-personal.component.css'
})
export class ViewPersonalComponent implements OnInit{

  constructor(
    private profileService:ProfileService,
    private fb:FormBuilder,
  ){}

  private idUser!:string;
  private jwtHelper = new JwtHelperService();
  public user!:RespPersonal;
  public openToast:boolean = false;

  public personalForm:FormGroup = this.fb.group({
    name: [''],
    lastname: [''],
    motherLastname: [''],
    gender: [''],
    birthdate: ['']
  });
  public dataInput:Form[] = [
    {
      label: 'Nombre',
      name: 'name',
      type: 'text'
    },
    {
      label: 'Apellido paterno',
      name: 'lastname',
      type: 'text'
    },
    {
      label: 'Apellido materno',
      name:'motherLastname',
      type: 'text'
    },
    {
      label: 'Género',
      name: 'gender',
      type: 'text'
    },
    {
      label: 'Fecha de nacimiento',
      name: 'birthdate',
      type: 'date'
    }
  ];

  ngOnInit(): void {
    this.getDataUser();
  }
  public getDataUser(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.idUser = decodedToken.sub;
      this.profileService.getDataPersonal(this.idUser).subscribe(resp => {
        this.user = resp;
        this.personalForm.patchValue(this.user);
        this.personalForm.disable();
      });
    }
  }
  public updatePersonal(form:FormGroup){
    if(form.invalid) return;
    this.personalForm.patchValue({
      name: form.value.name.trim().toLowerCase(),
      lastname: form.value.lastname.trim().toLowerCase(),
      motherLastname: form.value.motherLastname.trim().toLowerCase(),
      gender: form.value.gender.trim().toLowerCase(),
      birthdate: form.value.birthdate,
    });
    this.profileService.updateDataPersonal(this.idUser, form.value).subscribe(resp => {
      if(resp.status === 200){
        console.log("Entra")
        this.openToast = true;
        setTimeout(() => {
          this.openToast = false;
        }, 3000);
      }
    });
  }
}
