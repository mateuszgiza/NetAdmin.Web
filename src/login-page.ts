import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class LoginPage {
    model: LoginModel;
    
    constructor(private router: Router) {

    }

    signIn() {
        if (this.model.username === "admin" &&
            this.model.password === "admin") {
                this.router.navigate("");
        }
        alert(`Username: ${this.model.username} \nPassword: ${this.model.password}`);
    }
}

interface LoginModel {
    username: string;
    password: string;
}