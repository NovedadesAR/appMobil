import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/Login-data.interface';
import { LoginResonse } from '../interfaces/Login-response.interface';

const { url_api } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
  public login(dataLogin:LoginData) {
    return this.http.post<LoginResonse>(`${url_api}/login`, dataLogin);
  }
}
