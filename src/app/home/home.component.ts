import { Authentication } from '../login/authentication';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
  private connUrl = 'http://localhost:5000/Command/GetConnections';

  localState = { value: '' };
  user: string;
  connections: any[];
  selectedConn: any;

  constructor(
    public appState: AppState,
    public title: Title,
    private authService: Authentication,
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated === false) {
      this.router.navigate(['/login']);
      return;
    }

    console.log('hello `Home` component');
    console.log('Current App State', this.appState.state);

    this.user = this.authService.currentUser;

    let params = new URLSearchParams();
    params.set('name', this.user);
    this.http.get(this.connUrl, { search: params })
      .toPromise()
      .then(response => response.json())
      .then(conns => this.connections = conns);
  }

  logout(): void {
    this.authService.logout();
  }
}
