export interface RespUpdate{
  status:number;
  message:string;
}
export interface UpdatPersonal{
  name:string;
  lastname:string;
  motherLastname:string;
  gender:string;
  birthdate:string;
}
export interface UpdatCuenta{
  email:string;
  cellphone:string;
}
export interface UpdatSeguridad{
  question:string;
  answer:string;
}
export interface UpdatUbicacion{
  estado:string
  municipio:string;
  cp:number;
  colonia:string;
  referencia:string;
}
