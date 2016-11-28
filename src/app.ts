import {NavigationInstruction, Next, PipelineStep, Redirect, RouterConfiguration} from 'aurelia-router';

export class App {
  configureRouter(config: RouterConfiguration): void {
    config.title = 'NetAdmin';
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {
        route: '',
        moduleId: 'home',
        title: 'Home',
        settings: { roles: ['admin'] }
      },
      {
        route: 'login',
        moduleId: 'login-page',
        name: 'login-page',
        settings: { roles: [] }
      },
      {
        route: 'contacts/:id',
        moduleId: 'contact-detail',
        name:'contacts'
      }
    ]);
  }
}

class AuthorizeStep implements PipelineStep {
  public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf('admin') !== -1)) {
      var isAdmin = /* insert magic here */ false;
      if (!isAdmin) {
        return next.cancel(new Redirect('login-page'));
      }
    }

    return next();
  }
}
