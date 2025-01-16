import { Member } from './../models/member';
import { Component, inject, OnInit, ViewChildren } from '@angular/core';
import { CardComponent } from "../cards/cards.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-home',
  imports: [CardComponent, NavBarComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
}
