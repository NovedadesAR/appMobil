import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../../interfaces/Form.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RespCuenta } from '../../interfaces/DataProfile.interface';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent implements OnInit{
  constructor(
    private profileServile:ProfileService,
    private fb:FormBuilder,
  ) { }
  private jwtHelper = new JwtHelperService();
  private idUser!:string;

  public isLoader:boolean = true;
  public openToast:boolean = false;
  public dataAccount!:RespCuenta;
  public accountForm:FormGroup = this.fb.group({
    email:[''],
    cellphone:[''],

  });
  public dataInputs:Form[] = [
    {label: 'Correo electrónico', name: 'email', type: 'email'},
    {label: 'Número celular', name: 'cellphone', type: 'text'},
  ]
  ngOnInit(): void {
    this.getAccountData();
  }
  getAccountData(){
    const token = localStorage.getItem('token');
    if(token){
      const decodeToken = this.jwtHelper.decodeToken(token);
      this.idUser = decodeToken.sub;
      this.profileServile.getDataAccount(this.idUser).subscribe(res => {
        this.dataAccount = res;
        this.accountForm.patchValue(this.dataAccount);
        this.accountForm.disable();
        this.isLoader = false;
      })

    }
  }
  public updateDataPersonal(form:FormGroup){
    if(form.invalid) return;
    this.profileServile.updateUserCuenta(this.idUser, form.value).subscribe(res => {
      if(res.status === 200){
        this.openToast = true;
        setTimeout(() => {
          this.openToast = false;
        }, 3000)
      }
    });
  }
}
