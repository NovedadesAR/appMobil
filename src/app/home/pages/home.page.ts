import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {

  public products = [
    {
      id: 1,
      name: 'Producto 1',
      price: 10,
      image: 'https://res.cloudinary.com/dy5jdb6tv/image/upload/v1722550914/tu-carpeta/jqgsy5fpymuiakg0jfwr.webp'
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 20,
      image: 'https://res.cloudinary.com/dy5jdb6tv/image/upload/v1722550658/tu-carpeta/w6gtgxebtyjaipgavyqk.webp'
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 30,
      image: 'https://res.cloudinary.com/dy5jdb6tv/image/upload/v1722551355/tu-carpeta/tmi2lvlneecvbcjlpz02.webp'
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 30,
      image: 'https://res.cloudinary.com/dy5jdb6tv/image/upload/v1722551355/tu-carpeta/tmi2lvlneecvbcjlpz02.webp'
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 20,
      image: 'https://res.cloudinary.com/dy5jdb6tv/image/upload/v1722550658/tu-carpeta/w6gtgxebtyjaipgavyqk.webp'
    },
    {
      id: 1,
      name: 'Producto 1',
      price: 10,
      image: 'https://res.cloudinary.com/dy5jdb6tv/image/upload/v1722550914/tu-carpeta/jqgsy5fpymuiakg0jfwr.webp'
    },
  ]
  constructor() { }

}
