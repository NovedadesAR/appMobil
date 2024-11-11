import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/Profile.interfac';
import {
  RespCuenta,
  RespEnvio,
  RespPersonal,
  RespSeguridad,
  RespUpdate,
} from '../interfaces/DataProfile.interface';
import {
  UpdatCuenta,
  UpdatPersonal,
  UpdatSeguridad,
  UpdatUbicacion,
} from '../interfaces/UpdateProfile.interfas';
import { RespCopomex } from '../interfaces/ResponseCopomex.interface';
import { ResVentas } from '../interfaces/Ventas.interface';
import { CardResponse } from '../interfaces/RespProductsCard.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseBack } from 'src/app/login/interfaces/Response-back.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private router:Router
  ) {}

  private urlApi = environment.url_api;
  private headers = new HttpHeaders({ 'ngrok-skip-browser-warning': '1' });
  private jwtHerlper = new JwtHelperService();

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
  public getDataPersonal(id: string) {
    return this.http.get<RespPersonal>(
      `${this.urlApi}users/profile/personal/${id}`
    );
  }
  public getDataAccount(id: string) {
    return this.http.get<RespCuenta>(
      `${this.urlApi}users/profile/cuenta/${id}`
    );
  }
  public getDataSegurity(id: string) {
    return this.http.get<RespSeguridad>(
      `${this.urlApi}users/profile/seguridad/${id}`
    );
  }
  public getUbication(id: string) {
    return this.http.get<RespEnvio>(
      `${this.urlApi}users/profile/ubicacion/${id}`
    );
  }
  getDataCopomex(cp: string) {
    return this.http.get<RespCopomex>(
      `https://api.copomex.com/query/info_cp/${cp}?type=simplified&token=pruebas`
    );
  }
  /** Metodos para actualizar las informacion */
  public updateDataPersonal(id: string, data: UpdatPersonal) {
    return this.http.patch<RespUpdate>(
      `${this.urlApi}users/profile/update-user/${id}`,
      data
    );
  }
  public updateUserCuenta(id: string, data: UpdatCuenta) {
    return this.http.patch<RespUpdate>(
      `${this.urlApi}users/profile/update-user/${id}`,
      data
    );
  }
  public updateUserSeguridad(id: string, data: UpdatSeguridad) {
    return this.http.patch<RespUpdate>(
      `${this.urlApi}users/profile/update-user/${id}`,
      data
    );
  }
  public updateUserPassword(id: string, data: { password: string }) {
    return this.http.patch<RespUpdate>(
      `${this.urlApi}users/profile/update-user/${id}`,
      data
    );
  }
  public updateUserUbicacion(id: string, data: UpdatUbicacion) {
    return this.http.patch<RespUpdate>(
      `${this.urlApi}users/ubicacion/${id}`,
      data
    );
  }
  /** EndPoint para traer las compras **/
  public getComprasById(id: string) {
    return this.http.get<ResVentas>(`${this.urlApi}ventas/${id}`);
  }
  /** EndPoint para traer los productos del carrito **/
  public getProductosCarrito(id: string) {
    return this.http.post<CardResponse>(`${this.urlApi}carrito/get_card`, {
      id,
    });
  }
  /** EndPoint para agregar un producto al carrito **/
  public addProductToCard(data: {
    cantidad: number;
    idProduct: number;
    idUser: string;
  }) {
    return this.http.post<ResponseBack>(`${this.urlApi}carrito`, data);
  }

  addProductToCardSer(id: number) {
    const idUser = localStorage.getItem('token');
    if (idUser !== null) {
      const token = this.jwtHerlper.decodeToken(idUser);
      const dataCard = {
        cantidad: 1,
        idProduct: id,
        idUser: token.sub,
      };
      this.addProductToCard(dataCard).subscribe((data) => {
        if(data.status === 200){
          this.router.navigate(['/car']);
        }
      });
    }
  }
  deleteProductByCard(data: { id: number }) {
    return this.http.post<ResponseBack>(`${this.urlApi}carrito/delete_card`, data)
  }
  changeCantidad(data: { id: number, cantidad: number }) {
    return this.http.post<ResponseBack>(`${this.urlApi}carrito/update_cantidad`, data)
  }
}
