import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://63e3e2d765ae49317719e670.mockapi.io/api/v1/';

  constructor(private http: HttpClient) { }

  createUser(name: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = { name: name };

    return this.http.post(this.url + 'users', data, { headers: headers });
  }
}
