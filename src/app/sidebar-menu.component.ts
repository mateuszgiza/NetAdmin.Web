import { Component } from '@angular/core';

@Component({
    selector: 'sidebar-menu',
    templateUrl: 'sidebar-menu.component.html'
})
export class SidebarMenuComponent {
    databases: string[] = [
        "Db-1", "Db-2", "Db-3"
    ];
}
