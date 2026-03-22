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
  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  signup(userSignupDTO: UserSignupDTO) {
    return this.http.post('/user/register', userSignupDTO);
  }

  login(userLoginDTO: UserLoginDTO) {
    return this.http.post('/authenticate', userLoginDTO, {
      withCredentials: true,
    });
  }

  requestRefreshToken() {
    return this.http.post(
      '/user/refresh',
      {},
      {
        withCredentials: true,
      },
    );
  }

  logout() {
    this.clearAccessToken();
  }

  isAuthenticated() {
    if (!this.accessToken) {
      this.requestRefreshToken().subscribe({
        next: (res: any) => {
          this.setAccessToken(res.accessToken);
        },
        error: () => {
          this.clearAccessToken();
        },
      });
    }
    return this.tokenService.isLoggedIn(this.accessToken);
  }
}
