import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal} from '@angular/core';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/paginations';
import { UserParams } from '../models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient)
  private accountService = inject(AccountService)
  baseUrl = environment.apiUrl;
  user = this.accountService.currentUser()
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);


  getMembers(userParams: UserParams) {
    let params = this.setPaginationHeaders(userParams.pageNumber, userParams.pageSize)
    params = params.append('role', userParams.role)

    return this.http.get<Member[]>(this.baseUrl + 'user', {observe: 'response', params}).subscribe({
      next: response => {
        this.paginatedResult.set({
          items: response.body as Member[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
        })
      }
    })
  }

  private setPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();

    if(pageNumber && pageSize){
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize)
    }

    return params;
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
