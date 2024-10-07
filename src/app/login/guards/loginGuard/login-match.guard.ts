import { CanMatchFn } from '@angular/router';

export const loginMatchGuard: CanMatchFn = (route, segments) => {
  return false;
};
