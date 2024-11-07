import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-view-security',
  templateUrl: './view-security.component.html',
  styleUrl: './view-security.component.css'
})
export class ViewSecurityComponent implements OnInit{
  constructor(
    private profileService:ProfileService,
    private fb:FormBuilder,
  ) { }
  public isEdit:boolean = false;
  public showQuestion:boolean = false;
  public showAnswer:boolean = false;
  public showPass:boolean = false;
  public showConfirm:boolean = false;
  public isChangePassword:boolean = false
  private jwtHelper = new JwtHelperService();
  public formSecurity:FormGroup = this.fb.group({
    question:[''],
    answer:[''],
  });
  public formPassword:FormGroup = this.fb.group({
    password:['************'],
    passwordConfirm:[''],
  });
  ngOnInit(): void {
    this.getSecurityData();
  }

  public getSecurityData(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.profileService.getDataSegurity(decodedToken.sub).subscribe(resp =>{
        this.formSecurity.patchValue(resp);
        this.formSecurity.disable();
        this.formPassword.disable();
      })
    }
  }
  public editForm() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) this.formSecurity.enable();
    else this.formSecurity.disable();
  }
  public changePassword(){
    this.isChangePassword = true;
    this.formPassword.enable();
  }
}
