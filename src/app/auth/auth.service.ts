import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { UserSignupDTO } from './dto/user-signup.dto';
import { UserLoginDTO } from './dto/user-login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  signup(userSignupDTO: UserSignupDTO) {
    return this.http.post('/user/register', userSignupDTO);
  }

  login(userLoginDTO: UserLoginDTO) {
    return this.http
      .post('/authenticate', userLoginDTO, { observe: 'response' })
      .pipe(
        tap((res) => {
          const token = res.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token.substring(7));
          }
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return this.tokenService.isLoggedIn();
  }
}
