import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;

  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.decodeToken();
    if (!payload) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }
}
