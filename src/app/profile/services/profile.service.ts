import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/Profile.interfac';
import { RespCuenta, RespEnvio, RespPersonal, RespSeguridad } from '../interfaces/DataProfile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  private urlApi = environment.url_api;
  private headers = new HttpHeaders({ 'ngrok-skip-browser-warning': '1' });
  public checkLogin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  public getProfile(id: string) {
    return this.http.get<Profile>(`${this.urlApi}users/profile/` + id, {
      headers: this.headers,
    });
  }
  public getDataPersonal(id:string){
    return this.http.get<RespPersonal>(`${this.urlApi}users/profile/personal/${id}`)
  }
  public getDataAccount(id:string){
    return this.http.get<RespCuenta>(`${this.urlApi}users/profile/cuenta/${id}`)
  }
  public getDataSegurity(id:string){
    return this.http.get<RespSeguridad>(`${this.urlApi}users/profile/seguridad/${id}`)
  }
  public getUbication(id:string){
    return this.http.get<RespEnvio>(`${this.urlApi}users/profile/ubicacion/${id}`)
  }
}
