import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient)
  private accountService = inject(AccountService)
  baseUrl = environment.apiUrl;
  user = this.accountService.currentUser()

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'user')
  }
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'user/' + username)
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user', member)
  }
  updateMemberEspecifico(member: Member, username: string) {
    return this.http.put(this.baseUrl + 'user/' + username, member)
  }
}
