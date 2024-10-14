import { inject } from "@angular/core";
import { CanMatchFn } from "@angular/router";
import { LoginService } from "../../services/login.service";

export const codeMatchGuard:CanMatchFn = (route, segments) => {
  const loginService = inject(LoginService);

  if(loginService.recoverCode === '')
    return false;
  return true;
}
