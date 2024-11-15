import { CanMatchFn } from '@angular/router';

export const compraGuard: CanMatchFn = (route, segments) => {
  const product = localStorage.getItem('product');
  const token = localStorage.getItem('token');
  if(product && token)
    return true;
  else
  return false;
};
