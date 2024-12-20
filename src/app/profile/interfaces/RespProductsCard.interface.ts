export interface CardResponse {
  id:              number;
  estado:          number;
  detallesCarrito: DetallesCarrito[];
}

export interface DetallesCarrito {
  id:       number;
  cantidad: number;
  product:  Product;
}

export interface Product {
  id:              number;
  nombre_producto: string;
  precio:          number;
  descripccion:    string;
  stock:           number;
  categoria:       string;
  rating:          number;
  descuento:       number;
  status:          string;
  imagen:          Imagen[];
}

export interface Imagen {
  id:         number;
  url_imagen: string;
}
