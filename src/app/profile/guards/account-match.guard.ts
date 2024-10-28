import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { ProfileService } from '../services/profile.service';

export const accountMatchGuard: CanMatchFn = (route, segments) => {

  console.log("match")
  const profileService = inject(ProfileService);

  return profileService.checkLogin();
};
