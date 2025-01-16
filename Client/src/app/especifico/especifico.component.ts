import { Member } from './../models/member';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from '../services/members.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-especifico',
  imports: [NgIf],
  templateUrl: './especifico.component.html',
  styleUrl: './especifico.component.css'
})
export class EspecificoComponent implements OnInit {
  private membersService = inject(MembersService)
  private route = inject(ActivatedRoute)
  member!: Member;

  ngOnInit(): void {
    this.loadUser()
  }

  loadUser(){
    const username = this.route.snapshot.paramMap.get('username')
    if(!username){
      console.log('ID da rota não encontrado');
    return;
    };
    this.membersService.getMember(username).subscribe({
      next: user => this.member = user,
      error: error => console.log(error)
    })
  }

}
