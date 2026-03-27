import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit {
  initial = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.username$.subscribe((username) => {
      this.initial = username ? username.charAt(0).toUpperCase() : '';
    });
  }
}
