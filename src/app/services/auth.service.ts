import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  decode() {
    return sessionStorage.getItem('token');
  }
}
