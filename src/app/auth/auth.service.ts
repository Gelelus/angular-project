import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseDate {
  kind: string;
  idToken: string;
  email: string;
  refredhToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseDate>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTPlqNWQKSvmId92XTKjSNOJWhLIdUtMc',
      {
        email: email,
        password: password,
        returnSecureToken: true, //for firebase
      }
    );
  }
}
