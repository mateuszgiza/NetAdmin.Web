import {Router, RouterConfiguration} from 'aurelia-router';

interface DatabaseModel {
  name: string;
  tables: Array<string>;
}

export class App {
  router: Router;

  databases = [
    { name: "1", tables: ["1", "2"] },
    { name: "2", tables: ["1", "2"] },
    { name: "3", tables: ["1", "2"] },
    { name: "4", tables: ["1", "2"] },
    { name: "5", tables: ["1", "2"] }
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
