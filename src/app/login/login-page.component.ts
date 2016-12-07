import { Authentication } from './authentication';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    callback: string;

    constructor(
        private params: Params,
        private router: Router,
        private route: ActivatedRoute,
        private authService: Authentication
    ) {
        this.callback = params['callback'];
        let l = route.queryParams.map(p => p['ss']);
        let k = route.
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated) {
            this.router.navigate(['/']);
        }
    }

    signIn(): boolean {
        if (this.validate() === false) {
            return;
        }

        this.authService.authenticate(this.model);

        if (this.authService.isAuthenticated) {
            let url = this.callback || '/';
            this.router.navigate([url]);
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
