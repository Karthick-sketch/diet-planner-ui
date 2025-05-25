import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit {
  @Input() isLogin = false;
  @Input() isSignup = false;
  @Input() initial = 'k';

  ngOnInit() {
    this.initial = this.initial.toUpperCase();
  }
}
