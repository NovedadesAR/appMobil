import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { DetallesCarrito } from '../../interfaces/RespProductsCard.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrl: './shopping-car.component.css'
})
export class ShoppingCarComponent implements OnInit{
  constructor(
    private profileService:ProfileService,
  ) { }
  ionViewWillEnter(){
    console.log("se llama")
    this.getDataCard();
  }
  private jwtHelper = new JwtHelperService();
  private idUser:string = '';
  public productsCard:DetallesCarrito[] = [];
  public message:string = '';
  public isOpen:boolean = false;
  ngOnInit(): void {
    this.getDataCard();
  }

  public getDataCard(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.idUser = decodedToken.sub;
      this.profileService.getProductosCarrito(this.idUser).subscribe(res => {
        this.productsCard = res.detallesCarrito;
      });
    }
  }
  public deleteProductToCart(id:number){
    this.profileService.deleteProductByCard({id}).subscribe(res => {
      if(res.status === 200){
        this.getDataCard();
        this.message = "Eliminado exitosamente";
        this.isOpen = true;
      }
    })
  }
  public optionsCantidad(cantidad:number):number[]{
    let element:number[] = [];
    for (let i = 1; i <= cantidad; i++) {
      element.push(i);
    }
    return element;
  }
  public changeCantidad(cantidad:number,id:number){
    this.profileService.changeCantidad({id,cantidad}).subscribe(resp =>{
    })
  }

  public changePrice(){
    let price:number = 0;
    this.productsCard.forEach(item => {
      const descuento = item.product.precio * item.product.descuento / 100;
      price += (item.product.precio - descuento) * (item.cantidad);
    });
    return price;
  }
}
