import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResVentasDetallesVenta } from '../../interfaces/Ventas.interface';

@Component({
  selector: 'app-my-shopping',
  templateUrl: './my-shopping.component.html',
  styleUrl: './my-shopping.component.css'
})
export class MyShoppingComponent implements OnInit{
  constructor(
    private profileService:ProfileService,
  ) { }
  private jwtHelper = new JwtHelperService();
  private idUser!:string;
  public order:string = "ng";
  public filter:string = "ng";
  public isLoader:boolean = true;
  public allShoppigs:ResVentasDetallesVenta[] = [];
  public backup:ResVentasDetallesVenta[] = [];
  ngOnInit(): void {
    this.getComopras();
  }
  public getComopras(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.idUser = decodedToken.sub;
      this.profileService.getComprasById(this.idUser).subscribe(res => {
        this.allShoppigs = res.detallesVenta;
        this.backup = [...res.detallesVenta];
        if(res.status === 200){
          setTimeout(() => {
            this.isLoader = false;
          }, 500);
        }
      })
    }
  }
  public checkDate(date:string){
    const data = date.split('-');
    switch(data[1]){
      case '01':
        return `${data[2]} Enero de ${data[0]}`;
      case '02':
        return `${data[2]} Febrero de ${data[0]}`;
      case '03':
        return `${data[2]} Marzo de ${data[0]}`;
      case '04':
        return `${data[2]} Abril de ${data[0]}`;
      case '05':
        return `${data[2]} Mayo de ${data[0]}`;
      case '06':
        return `${data[2]} Junio de ${data[0]}`;
      case '07':
        return `${data[2]} Julio de ${data[0]}`;
      case '08':
        return `${data[2]} Agosto de ${data[0]}`;
      case '09':
        return `${data[2]} Septiembre de ${data[0]}`;
      case '10':
        return `${data[2]} Octubre de ${data[0]}`;
      case '11':
        return `${data[2]} Noviembre de ${data[0]}`;
      case '12':
        return `${data[2]} Diciembre de ${data[0]}`;
      default:
        return ``;
    }
  }
  public checkStatus(status:string){
    switch(status){
      case 'proceso':
        return 'En camino';
      case 'Fenvio':
        return 'En preparacion';
      case 'completo':
        return 'Entregado';
      default:
        return '';
    }
  }
  public orden(){
    switch(this.order){
      case 'desc':
        this.allShoppigs = this.allShoppigs.sort((a,b) => b.total_venta - a.total_venta);
        break;
      case 'asc':
        this.allShoppigs = this.allShoppigs.sort((a,b) => a.total_venta - b.total_venta);
        break;
      case 'ng':
        this.allShoppigs = [...this.backup];
        break;
    }
  }
  public filtrar(){
    this.allShoppigs = [...this.backup];
    switch(this.filter){
      case 'camino':
        console.log('camino')
        this.allShoppigs = this.allShoppigs.filter(res => res.estado === 'Fenvio');
        break;
      case 'fenviar':
        console.log('proceso')
        this.allShoppigs = this.allShoppigs.filter(res => res.estado === 'proceso');
        break;
      case 'completo':
        console.log('completo')
        this.allShoppigs = this.allShoppigs.filter(res => res.estado === 'completo');
        break;
      case 'ng':
        this.allShoppigs = [...this.backup];
        break;
    }
  }
}
