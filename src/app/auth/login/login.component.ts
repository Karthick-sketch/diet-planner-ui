import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserLoginDTO } from '../dto/user-login.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RouterLink, FormsModule],
})
export class LoginComponent implements OnInit {
  user: UserLoginDTO;
  isInvalidCredentials = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = new UserLoginDTO();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  submit() {
    if (this.user.username && this.user.password) {
      this.authService.login(this.user).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isInvalidCredentials = true;
        },
      });
    }
  }
}
