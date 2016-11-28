import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class Home {
    message = "Home message";

    constructor(private router: Router) {
        
    }
}