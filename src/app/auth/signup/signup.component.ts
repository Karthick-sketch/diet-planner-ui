import { Component, OnInit } from '@angular/core';
import { UserSignupDTO } from '../dto/user-signup.dto';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, RouterLink, HeaderComponent],
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  user: UserSignupDTO;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = new UserSignupDTO();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/diet-plans']);
    }
  }

  submit() {
    if (this.user.username && this.user.password) {
      this.authService.signup(this.user).subscribe(() => {
        this.router.navigate(['/diet-plans']);
      });
    }
  }
}
