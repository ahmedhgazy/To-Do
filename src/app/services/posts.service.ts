import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url: 'https://jsonplaceholder.typicode.com/users';
  http: HttpClient = inject(HttpClient);
  getUsers() {
    return this.http.get<Users[]>(this.url);
  }
}
