import { Member } from './../models/member';
import { Component, inject, OnInit, ViewChildren } from '@angular/core';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-cards',
  imports: [RouterLink, ReactiveFormsModule, NgxPaginationModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardComponent implements OnInit {
  p: number = 1;
  filtro: string = "Programação"
  collection: any[] = [];
  memberService = inject(MembersService)
  baseUrl = environment.apiUrl
  accountService = inject(AccountService)
  members: Member[] = [];

  ngOnInit(): void {
    this.loadMember()
  }
  loadMember() {
    this.memberService.getMembers().subscribe({
      next: member => {this.members = member.filter(u => u.role === this.filtro)
          console.log(this.members.filter(a => a.age) )
      },
      error: error => console.log(error)
    })
  }

deleteUser(user: Member) {
  console.log("teste")
  this.accountService.delete(user).subscribe({
    next: _ => {
      console.log(user);

      console.log(this.members);

      this.members = this.members.filter((u: Member) => u.id !== user.id);
      console.log(this.members);
    },
    error: error => console.log(error)
  })
}
}
