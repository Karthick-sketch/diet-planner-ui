import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { UserSignupDTO } from '../dto/user-signup.dto';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, RouterLink],
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user: UserSignupDTO;

  constructor(private userService: UserService) {
    this.user = new UserSignupDTO();
  }

  submit() {
    if (this.user.username && this.user.password) {
      this.userService.signup(this.user).subscribe();
    }
  }
}
