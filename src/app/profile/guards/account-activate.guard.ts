import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ProfileService } from '../services/profile.service';

export const accountActivateGuard: CanActivateFn = (route, state) => {

  const profileService =  inject(ProfileService);

  return profileService.checkLogin();

};
