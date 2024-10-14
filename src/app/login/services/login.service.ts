import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/Login-data.interface';
import { LoginResonse } from '../interfaces/Login-response.interface';
import { CheckLoginResponse } from '../interfaces/Check-email-response.interface';
import { ResponseEmail } from '../interfaces/Response-code-recover.interface';
import { ResponseBack } from '../interfaces/Response-back.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }

  private codeRecover:string = '';
  private email:string = '';

  private ulr_api = environment.url_api
  public login(dataLogin:LoginData) {
    return this.http.post<LoginResonse>(`${this.ulr_api}login`, dataLogin);
  }
  public checkEmail(email:string){
    return this.http.post<CheckLoginResponse>(`${this.ulr_api}recover-password`,{email});
  }
  public sendCodeRecoverPassword(email:string){
    return this.http.post<ResponseEmail>(`${this.ulr_api}email`,{to:email});
  }















  //Funcion para crear el usuario
  createUser(user: any) {
    return this.http.post<ResponseBack>(this.ulr_api + 'users', user);
  }


  updatePassword(email: string, password: {password:string,ip:string,fecha:string}){
    return this.http.patch<ResponseBack>(`${this.ulr_api}users/password/${email}`,password)
  }

  get recoverCode(){
    return this.codeRecover;
  }
  set setRecoverCode(code:string){
    this.codeRecover = code;
  }
  get gEmail(){
    return this.email;
  }
  set sEmail(email:string){
    email = email
  }
}
