import { inject, Inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { LoginService } from "../../services/login.service";

export const CodeActivateGuard:CanActivateFn = (router, segments) =>{
  const loginService = inject(LoginService);

  if(loginService.recoverCode === '')
    return false;
  return true;
}
