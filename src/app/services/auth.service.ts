import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, senha: string) {
    return this.http
      .post<any>(environment.apiUrl + '/v1/auth/login', {
        usuario,
        senha: CryptoJS.MD5(senha).toString(),
      })
      .pipe(
        map((data) => {
          localStorage.setItem('token', data.token);
          const helper = new JwtHelperService();
          try {
            const decodedToken = helper.decodeToken(data.token);
            if (!data.token) {
              this.logout();
            }
            this.router.navigate(['']);
            return data;
          } catch (error) {
            this.logout();
            return false; // Se houver um erro na decodificação, o token é inválido
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLogged() {
    let token = localStorage.getItem('token') || '';
    const helper = new JwtHelperService();
    try {
      const decodedToken = helper.decodeToken(token);
      if (!token) {
        this.logout();
      }
      return true;
    } catch (error) {
      this.logout();
      return false; // Se houver um erro na decodificação, o token é inválido
    }
  }
}
