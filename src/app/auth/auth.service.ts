import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
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
        observe: 'response',
      },
    );
  }

  logout() {
    this.clearAccessToken();
  }

  isAuthenticated(): Observable<boolean> {
    // If we already have a valid token, return immediately
    if (this.tokenService.isLoggedIn(this.accessToken)) {
      return of(true);
    }

    // Otherwise, attempt to refresh and wait for the result
    return this.requestRefreshToken().pipe(
      map((res: any) => {
        const authHeader = res.headers?.get('Authorization');
        if (authHeader) {
          const accessToken = authHeader.substring(7);
          this.setAccessToken(accessToken);
          return true;
        }
        return false;
      }),
      catchError(() => {
        this.clearAccessToken();
        return of(false);
      }),
    );
  }
}
