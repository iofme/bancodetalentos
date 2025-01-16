import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Member } from '../models/member';

@Component({
  selector: 'app-edit-admin',
  imports: [FormsModule],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent implements OnInit {
  private accountService = inject(AccountService)
  private membersService = inject(MembersService)
  private route = inject(ActivatedRoute)
  member?: Member;

  @ViewChild('editForm') editForm?: NgForm;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      console.log('ID da rota não encontrado');
      return;
    }
    this.membersService.getMember(username).subscribe({
      next: user => this.member = user,
      error: error => console.log(error)
    });
  }


  saveChanges() {
      this.membersService.updateMemberEspecifico(this.editForm?.value, this.member!.userName).subscribe({
        next: _ => {
          this.editForm?.reset(this.member);
          alert("Alterações salvas");
        },
        error: error => console.log(error)
      });
    } 
}

