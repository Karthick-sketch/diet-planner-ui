import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserLoginDTO } from '../dto/user-login.dto';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RouterLink, FormsModule, HeaderComponent],
})
export class LoginComponent implements OnInit {
  user: UserLoginDTO;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = new UserLoginDTO();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/diet-plans']);
    }
  }

  submit() {
    if (this.user.username && this.user.password) {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/diet-plans']);
      });
    }
  }
}
