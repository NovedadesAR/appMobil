import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/Profile.interfac';

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
      console.log('encuentra');
      return true;
    }
    console.log('no encuentra');
    return false;
  }
  public getProfile(id: string) {
    return this.http.get<Profile>(`${this.urlApi}users/profile/` + id, {
      headers: this.headers,
    });
  }
}
