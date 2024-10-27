import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ProductoIni } from '../../interfaces/Data-home.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage implements AfterViewInit, OnInit {

  constructor(private homeService:HomeService) {}

  @ViewChild('slider') slider!: ElementRef;

  public novedades:ProductoIni[] = [];
  public descuentos:ProductoIni[] = [];
  public dama:ProductoIni[] = [];
  public caballero: ProductoIni[] = [];
  public isLoader:boolean = true;
  selectImage(element: ElementRef) {
    const elementDiv = element.nativeElement as HTMLInputElement;
    let index = 1;
    setInterval(() => {
      let porcentaje = index * -100;
      elementDiv.style.transform = `translateX(${porcentaje}%)`;
      if (index >= elementDiv.children.length - 1) index = 0;
      else index++;
    }, 2000);
  }
  ngAfterViewInit(): void {
    this.selectImage(this.slider);
  }
  ngOnInit(): void {
    this.homeService.getProductByHome().subscribe(res => {
      this.novedades = res.novedades;
      this.descuentos = res.descuento;
      this.dama = res.dama;
      this.caballero = res.caballero;
      this.isLoader = false;
    });
  }
}
