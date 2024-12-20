import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  constructor(private profileService:ProfileService, private router:Router) { }

  private jwtHelper = new JwtHelperService();
  public name:string = '';
  public email:string = '';
  public photo:string = '';
  public isLoader:boolean = true;

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        this.logout();
      },
    },
  ];

  ngOnInit(): void {
    this.getUserProfile();
  }

  public getUserProfile(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.profileService.getProfile(decodedToken.sub).subscribe((res) => {
        if(res.status === 200){
          this.name = res.name;
          this.email = res.email;
          this.photo = res.url_photo;
          this.isLoader = false;
        }
      });
    }
  }

  private  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

}
