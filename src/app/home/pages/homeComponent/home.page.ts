import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ProductoIni } from '../../interfaces/Data-home.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService, Route } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage implements AfterViewInit, OnInit {
  constructor(
    private homeService: HomeService,
    private fb:FormBuilder,
    private router:Router,
    private productService:ProductsService
  ) {}

  @ViewChild('slider') slider!: ElementRef;

  public novedades: ProductoIni[] = [];
  public descuentos: ProductoIni[] = [];
  public dama: ProductoIni[] = [];
  public caballero: ProductoIni[] = [];
  public isLoader: boolean = true;


  public faildConection:boolean = false;

  public searchForm = this.fb.group({
    search: ['',[Validators.required]],
  });


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
    this.homeService.getProductByHome().subscribe((res) => {
      this.novedades = res.novedades;
      this.descuentos = res.descuento;
      this.dama = res.dama;
      this.caballero = res.caballero;
      this.isLoader = false;
      this.faildConection = false;
      // this.saveRoute();
    },(Error)=>{
      console.log("Hay error")
      this.faildConection = true;
    });
  }

  // public saveRoute(){
  //   const params:Route = {
  //     name:'',
  //     category:'',
  //     gender:'',
  //   }
  //   this.productService.routerSet = params;
  // }

  public reloadPage(){
    this.ngOnInit();
  }
  public serachProduct(){
    console.log(this.searchForm.controls['search'].value)
    if(this.searchForm.invalid) return;
    const value = this.searchForm.controls['search'].value;
    this.searchForm.reset();
    this.router.navigate([`/products/name/${value}`]);
  }
}
