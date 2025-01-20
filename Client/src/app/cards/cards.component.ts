import { Member } from './../models/member';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserParams } from '../models/userParams';

@Component({
  selector: 'app-cards',
  imports: [RouterLink, ReactiveFormsModule, FormsModule, PaginationModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardComponent implements OnInit {
  memberService = inject(MembersService)
  baseUrl = environment.apiUrl
  accountService = inject(AccountService)
  userParams = new UserParams(this.accountService.currentUser())
  members: Member[] = [];
  roleList = [{value: 'Programação', display: 'Programação'},{value: 'Design', display: 'Design'},{value: 'Games', display: 'Games'}]

  ngOnInit(): void {
    this.loadMember()
  }
  loadMember() {
    this.memberService.getMembers(this.userParams)
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

  pageChanged(event: any) {
    if (this.userParams.pageNumber != event.page) {
      this.userParams.pageNumber = event.page;
      this.loadMember();
    }
  }
}
