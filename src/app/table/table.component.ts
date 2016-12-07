import { Authentication } from '../login/authentication';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'table',
    templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit {
    database: string;
    table: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: Authentication
    ) { }

    ngOnInit(): void {
        if (this.authService.isAuthenticated === false) {
            this.router.navigate(['/login']);
            return;
        }

        this.route.params
            .subscribe((params: Params) => {
                this.database = params['db'];
                this.table = params['table'];
            });
    }
}
