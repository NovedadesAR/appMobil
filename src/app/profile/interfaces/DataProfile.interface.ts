export interface RespPersonal{
  status:number;
  name:string;
  lastname:string;
  motherLastname:string;
  gender:string;
  birthdate:string;
}
export interface RespCuenta{
  status:number;
  email:string;
  cellphone:string;
}
export interface RespSeguridad{
  status:number;
  question:number;
  answer:string;
}
export interface RespEnvio{
  status:number;
  estado:string;
  municipio:string;
  cp:number;
  colonia:string;
  referencia:string;
}
export interface RespUpdate{
  status:number;
  message:string;
}
