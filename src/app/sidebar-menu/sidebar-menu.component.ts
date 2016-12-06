import { Component } from '@angular/core';

@Component({
    selector: 'sidebar-menu',
    templateUrl: 'sidebar-menu.component.html'
})
export class SidebarMenuComponent {
    databases: IDatabaseEntry[] = [
        { name: 'Db-1', tables: [{ name: 'Table-1' }, { name: 'Table-2' }, { name: 'Table-3' }] },
        { name: 'Db-2', tables: [{ name: 'Table-1' }, { name: 'Table-2' }, { name: 'Table-3' }] },
        { name: 'Db-3', tables: [{ name: 'Table-1' }, { name: 'Table-2' }, { name: 'Table-3' }] },
    ];
    selected: IDatabaseEntry;

    click(db: IDatabaseEntry): void {
        if (this.selected === db) {
            this.selected = null;
        }
        else {
            this.selected = db;
        }
    }
}

export interface IDatabaseEntry {
    name: string;
    tables: ITableEntry[];
};

export interface ITableEntry {
    name: string;
};
