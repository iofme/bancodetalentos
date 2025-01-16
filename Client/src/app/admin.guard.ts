import { CanActivateFn } from '@angular/router';
import { AccountService } from './services/account.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);

  if(accountService.roles().includes('Admin') || accountService.roles().includes('Moderator')){
    return true;
  } else{
    alert("Você não tem permição")
    return false;
  }
};
