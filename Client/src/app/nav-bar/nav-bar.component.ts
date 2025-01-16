import { Component, inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
 accountService = inject(AccountService)
}
