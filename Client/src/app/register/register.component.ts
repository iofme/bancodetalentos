import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Member } from '../models/member';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm?: NgForm
  private http = inject(HttpClient)
  private accountService = inject(AccountService);
  private router = inject(Router);

  register() {
    return this.http.post<Member>(this.accountService.baseUrl + 'account/register', this.registerForm?.value).subscribe({
      next: _ => {
        alert("Usuário criado com sucesso"),
          this.router.navigateByUrl('')
      },

      error: error => console.log(error)
    })
  }

  cancel() {
    this.router.navigateByUrl('')
  }
}
