import {Router, RouterConfiguration} from 'aurelia-router';

interface DatabaseModel {
  name: string;
  tables: Array<string>;
}

export class App {
  router: Router;

  databases = [
    { name: "Database 1", tables: ["Table 1", "Table 2"] },
    { name: "Database 2", tables: ["Table 1", "Table 2"] },
    { name: "Database 3", tables: ["Table 1", "Table 2"] },
    { name: "Database 4", tables: ["Table 1", "Table 2"] },
    { name: "Database 5", tables: ["Table 1", "Table 2"] }
  ];
  
  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'NetAdmin';
    config.map([
      { route: '',              moduleId: 'home',   title: 'Home'},
      { route: 'contacts/:id',  moduleId: 'contact-detail', name:'contacts' }
    ]);

    this.router = router;
  }
}
