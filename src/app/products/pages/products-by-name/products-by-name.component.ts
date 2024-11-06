import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductByName } from '../../interfaces/ProductsByName.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-by-name',
  templateUrl: './products-by-name.component.html',
  styleUrl: './products-by-name.component.css',
})
export class ProductsByNameComponent implements OnInit {
  constructor(
    private producsService: ProductsService,
    private activateRoute: ActivatedRoute,
    private fb:FormBuilder,
  ) {}
  public products: ProductByName[] = [];
  public order: string = 'asc';
  public inputName: string = '';
  public isLoader: boolean = true;
  public searchForm:FormGroup = this.fb.group({
    search: ['',[Validators.required]],
  })
  ngOnInit(): void {
    this.searchProductByUrl();
  }

  public searchProductByUrl() {
    this.isLoader = true;
    this.activateRoute.params.subscribe((params) => {
      this.inputName = params['name'] as string;
      this.searchForm.patchValue({
        search: this.inputName
      })
      this.producsService
        .getProductByName(this.inputName.toLowerCase())
        .subscribe((resp) => {
          this.products = resp.data;
          this.isLoader = false;
        });
    });
  }
  public searchProductByBar(){
    if(this.searchForm.invalid) return
    this.isLoader = true;
    const value = this.searchForm.controls['search'].value;
    this.producsService.getProductByName(value).subscribe(resp => {
      this.products = resp.data;
      this.isLoader = false;
    })
  }
  public orderProductsByOrder() {
    this.products.sort((a, b) => {
      if (this.order === 'asc') {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  }
}
