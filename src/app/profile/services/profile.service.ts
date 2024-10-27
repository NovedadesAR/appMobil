import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}
  public checkLogin(): boolean {
    const token = localStorage.getItem('token');
    if (token) return true;
    return false;
  }
}
