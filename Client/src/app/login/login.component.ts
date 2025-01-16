import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private accountService = inject(AccountService)
  private routes = inject(Router)
  user: any = {}

  login() {
    this.accountService.login(this.user).subscribe({
      next: response => {
      this.routes.navigateByUrl('')
      },
      error: error => alert(error.error)
    })
  }

  logout(){
    this.accountService.logout();
  }
}
