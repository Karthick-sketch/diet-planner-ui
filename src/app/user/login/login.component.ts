import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { UserLoginDTO } from '../dto/user-login.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RouterLink],
})
export class LoginComponent {
  user: UserLoginDTO;

  constructor(private userService: UserService) {
    this.user = new UserLoginDTO();
  }

  submit() {
    if (this.user.username && this.user.password) {
      this.userService.login(this.user).subscribe();
    }
  }
}
