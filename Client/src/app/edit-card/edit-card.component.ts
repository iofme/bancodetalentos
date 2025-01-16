import { Member } from './../models/member';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-edit-card',
  imports: [FormsModule],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.css'
})
export class EditCardComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  private membersService = inject(MembersService)
  private accountService = inject(AccountService)
  private route = inject(ActivatedRoute)
  member?: Member;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const user = this.accountService.currentUser()
    if (!user) return;
    this.membersService.getMember(user.username).subscribe({
      next: user => this.member = user
    })
  }

  saveChanges() {
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: _ => { 
        this.editForm?.reset(this.member)
        alert("Alterações salvas")
      },
      error: error => console.log(error)
    })
  }
}
