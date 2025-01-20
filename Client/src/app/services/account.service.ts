import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl
  currentUser = signal<User | null>(null)
  roles = computed(() => {
    const user = this.currentUser();
    if (user && user.token) {
      const role = JSON.parse(atob(user.token.split('.')[1])).role;
      return Array.isArray(role) ? role : [role];
    }
    return [];
  })

  login(user: User) {
    return this.http.post<User>(this.baseUrl + 'account/login', user).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user)
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }



  getUser(username: string) {
    return this.http.get<User>(this.baseUrl + 'user/' + username, this.getHttpOpitions())
  }

  updateUser(user: Member) {
    return this.http.put(this.baseUrl + 'user', user)
  }

  register(member: Member) {
    return this.http.post<Member>(this.baseUrl + 'account/register', member);
  }

  delete(member: Member) {
    return this.http.delete(this.baseUrl + 'account/delete/' + member.userName,
      {
        responseType: "text"
      }
    );
  }

  getHttpOpitions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.currentUser()?.token}`
      })
    }
  }
}
