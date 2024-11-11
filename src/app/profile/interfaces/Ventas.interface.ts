export interface ResVentas {
  status:        number;
  detallesVenta: ResVentasDetallesVenta[];
}

export interface ResVentasDetallesVenta {
  id:            number;
  total_venta:   number;
  fecha_venta:   string;
  estado:string;
  detallesVenta: DetallesVentaDetallesVenta[];
  envio:{
    id:number;
    numero_guia:string;
    fecha_salida:string;
    fecha_entrega:string;
  } | null
}

export interface DetallesVentaDetallesVenta {
  id:        number;
  cantidad:  number;
  descuento: number;
  precio:    number;
  calificacion: number;
  sub_total: number;
  producto:  Producto;
}

export interface Producto {
  id:              number;
  nombre_producto: string;
  precio:          number;
  descripccion:    string;
  stock:           number;
  categoria:       string;
  rating:          number;
  descuento:       number;
  status:          string;
  imagen: {
    id:         number;
    url_imagen: string;
  }[];
}
