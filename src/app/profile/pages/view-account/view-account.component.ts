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
      this.profileServile.getDataAccount(decodeToken.sub).subscribe(res => {
        this.dataAccount = res;
        this.accountForm.patchValue(this.dataAccount);
        this.accountForm.disable();
      })

    }
  }
}
