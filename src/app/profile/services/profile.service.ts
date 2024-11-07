import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/Profile.interfac';
import { RespCuenta, RespEnvio, RespPersonal, RespSeguridad, RespUpdate } from '../interfaces/DataProfile.interface';
import { UpdatCuenta, UpdatPersonal, UpdatSeguridad, UpdatUbicacion } from '../interfaces/UpdateProfile.interfas';

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
  /** Metodos para obtener la informacion de cada seccion */
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
  /** Metodos para actualizar las informacion */
  public updateDataPersonal(id:string,data: UpdatPersonal){
    return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/${id}`,data);
  }
  public updateUserCuenta(id: string, data: UpdatCuenta) {
    return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/${id}`, data)
  }
  public updateUserSeguridad(id: string, data: UpdatSeguridad) {
      return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/${id}`, data)
    }
  public updateUserPassword(id: string, data: { password: string }) {
      return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/${id}`, data)
    }
  public updateUserUbicacion(id: string, data: UpdatUbicacion) {
      return this.http.patch<RespUpdate>(`${this.urlApi}users/ubicacion/${id}`, data)
    }
}
