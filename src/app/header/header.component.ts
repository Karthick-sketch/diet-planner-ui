import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit {
  @Input() initial = 'k';

  isLogin = false;
  isSignup = false;
  isProfileExpanded = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.initial = this.initial.toUpperCase();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLogin = event.url === '/login';
        this.isSignup = event.url === '/signup';
      });
  }

  expandProfile() {
    this.isProfileExpanded = !this.isProfileExpanded;
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
