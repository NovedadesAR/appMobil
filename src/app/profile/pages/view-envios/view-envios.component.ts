import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Form } from '../../interfaces/Form.interface';

@Component({
  selector: 'app-view-envios',
  templateUrl: './view-envios.component.html',
  styleUrl: './view-envios.component.css'
})
export class ViewEnviosComponent implements OnInit{
  constructor(
    private ProfileService: ProfileService,
    private fb:FormBuilder,
  ) { }
  private jwtHelper = new JwtHelperService();
  public formUbic:FormGroup = this.fb.group({
    estado:[''],
    municipio:[''],
    cp:[''],
    colonia:[''],
    referencia:[''],
  });
  public inputsUbic:Form[] = [
    {label:'Estado', name:'estado', type:'text'},
    {label:'Municipio', name:'municipio', type:'text'},
    {label:'CP', name:'cp', type:'number'},
    {label:'Colonia', name:'colonia', type:'text'},
    {label:'Referencia', name:'referencia', type:'text'},
  ]
  ngOnInit(): void {
    this.getDataEnvio();
  }

  getDataEnvio(){
    const token = localStorage.getItem('token');
    if(token){
      const decodeToken = this.jwtHelper.decodeToken(token);
      this.ProfileService.getUbication(decodeToken.sub).subscribe((res) => {
          this.formUbic.patchValue(res);
          this.formUbic.disable();
      });
    }
  }
}
