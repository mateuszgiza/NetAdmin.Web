import { Auth } from '../auth';
import { Authentication } from './authentication';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginModel } from './models';

@Component({
    selector: 'login',
    templateUrl: 'login-page.component.html',
    providers: [
        Authentication
    ]
})
export class LoginPageComponent {
    model: ILoginModel = <ILoginModel>{};

    constructor(
        private router: Router,
        private authService: Authentication,
        private auth: Auth
    ) { }

    ngOnInit(): void {
        // if (this.authService.isAuthenticated()) {
        //     this.router.navigate(['/']);
        // }
    }

    signIn(): boolean {
        if (this.validate() === false) {
            return;
        }

        this.authService.authenticate(this.model);

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        }

        // Notify user that he is not authenticated
        return false;
    }

    private validate(): boolean {
        return this.model != null &&
            this.model.username != null &&
            this.model.username.length > 0 &&
            this.model.password != null &&
            this.model.password.length > 0;
    }
}
