import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from './dto/user.dto';
import { UserSignupDTO } from './dto/user-signup.dto';
import { UserLoginDTO } from './dto/user-login.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  signup(userSignupDTO: UserSignupDTO) {
    return this.http.post<UserDTO>('/user/register', userSignupDTO);
  }

  login(userLoginDTO: UserLoginDTO) {
    return this.http.post<UserDTO>('/authenticate', userLoginDTO);
  }
}
