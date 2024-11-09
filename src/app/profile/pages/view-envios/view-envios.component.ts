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
    private profileService: ProfileService,
    private fb:FormBuilder,
  ) { }
  private jwtHelper = new JwtHelperService();
  public formUbic:FormGroup = this.fb.group({
    cp:[''],
    estado:[''],
    municipio:[''],
    colonia:[''],
    referencia:[''],
  });
  public inputsUbic:Form[] = [
    {label:'CP', name:'cp', type:'number'},
    {label:'Estado', name:'estado', type:'text'},
    {label:'Municipio', name:'municipio', type:'text'},
    {label:'Colonia', name:'colonia', type:'text'},
    {label:'Referencia', name:'referencia', type:'text'},
  ]
  ngOnInit(): void {
    this.getDataEnvio();
  }

  public getDataEnvio(){
    const token = localStorage.getItem('token');
    if(token){
      const decodeToken = this.jwtHelper.decodeToken(token);
      this.profileService.getUbication(decodeToken.sub).subscribe((res) => {
          this.formUbic.patchValue(res);
          this.formUbic.disable();
      });
    }
  }
  public searchUbication(code:string){
    this.profileService.getDataCopomex(code).subscribe(resp => {
      console.log(resp.response);
      const resCop = {
        cp: resp.response.cp,
        estado: resp.response.estado,
        municipio: resp.response.municipio,
        colonia: resp.response.asentamiento[0],
      }
      this.formUbic.patchValue(resCop);
    });
  }
}
