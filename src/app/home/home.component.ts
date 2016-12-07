import { Authentication } from '../login/authentication';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  localState = { value: '' };
  user: string;

  constructor(
    public appState: AppState,
    public title: Title,
    private authService: Authentication,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated === false) {
      this.router.navigate(['/login']);
      return;
    }

    console.log('hello `Home` component');
    console.log('Current App State', this.appState.state);

    this.user = this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}
