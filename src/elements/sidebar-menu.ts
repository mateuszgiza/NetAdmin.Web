
interface DatabaseModel {
  name: string;
  tables: Array<string>;
}

export class SidebarMenuCustomElement {
    databases = [
    { name: "Database 1", tables: ["Table 1", "Table 2"] },
    { name: "Database 2", tables: ["Table 1", "Table 2"] },
    { name: "Database 3", tables: ["Table 1", "Table 2"] },
    { name: "Database 4", tables: ["Table 1", "Table 2"] },
    { name: "Database 5", tables: ["Table 1", "Table 2"] }
  ];
}