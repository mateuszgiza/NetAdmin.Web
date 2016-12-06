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
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                this.database = params['db'];
                this.table = params['table'];
            });
    }
}
