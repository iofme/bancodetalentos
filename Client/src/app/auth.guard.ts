import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from './services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)

  if(accountService.currentUser()){
    return true;
  } else{
    alert("você não tem permissão")
    return false;
  }
};
