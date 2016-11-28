define('app',["require", "exports", 'aurelia-router'], function (require, exports, aurelia_router_1) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config) {
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
                    name: 'contacts'
                }
            ]);
        };
        return App;
    }());
    exports.App = App;
    var AuthorizeStep = (function () {
        function AuthorizeStep() {
        }
        AuthorizeStep.prototype.run = function (navigationInstruction, next) {
            if (navigationInstruction.getAllInstructions().some(function (i) { return i.config.settings.roles.indexOf('admin') !== -1; })) {
                var isAdmin = false;
                if (!isAdmin) {
                    return next.cancel(new aurelia_router_1.Redirect('login-page'));
                }
            }
            return next();
        };
        return AuthorizeStep;
    }());
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('elements/sidebar-menu',["require", "exports"], function (require, exports) {
    "use strict";
    var SidebarMenuCustomElement = (function () {
        function SidebarMenuCustomElement() {
            this.databases = [
                { name: "Database 1", tables: ["Table 1", "Table 2"] },
                { name: "Database 2", tables: ["Table 1", "Table 2"] },
                { name: "Database 3", tables: ["Table 1", "Table 2"] },
                { name: "Database 4", tables: ["Table 1", "Table 2"] },
                { name: "Database 5", tables: ["Table 1", "Table 2"] }
            ];
        }
        SidebarMenuCustomElement.prototype.click = function (database) {
            if (this.selected === database) {
                this.selected = null;
            }
            else {
                this.selected = database;
            }
            return true;
        };
        return SidebarMenuCustomElement;
    }());
    exports.SidebarMenuCustomElement = SidebarMenuCustomElement;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('home',["require", "exports", 'aurelia-router', 'aurelia-framework'], function (require, exports, aurelia_router_1, aurelia_framework_1) {
    "use strict";
    var Home = (function () {
        function Home(router) {
            this.router = router;
            this.message = "Home message";
        }
        Home = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router), 
            __metadata('design:paramtypes', [aurelia_router_1.Router])
        ], Home);
        return Home;
    }());
    exports.Home = Home;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('login-page',["require", "exports", 'aurelia-router', 'aurelia-framework'], function (require, exports, aurelia_router_1, aurelia_framework_1) {
    "use strict";
    var LoginPage = (function () {
        function LoginPage(router) {
            this.router = router;
        }
        LoginPage.prototype.signIn = function () {
            if (this.model.username === "admin" &&
                this.model.password === "admin") {
                this.router.navigate("");
            }
            alert("Username: " + this.model.username + " \nPassword: " + this.model.password);
        };
        LoginPage = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router), 
            __metadata('design:paramtypes', [aurelia_router_1.Router])
        ], LoginPage);
        return LoginPage;
    }());
    exports.LoginPage = LoginPage;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./styles/default.css\"></require>\n  <require from=\"./elements/sidebar-menu\"></require>\n\n  <sidebar-menu></sidebar-menu>\n\n  <div class=\"content\">\n    <router-view></router-view>\n    \n    <footer>\n      <p>&copy; 2016 - NetAdmin</p>\n    </footer>\n  </div>\n\n</template>"; });
define('text!elements/sidebar-menu.html', ['module'], function(module) { module.exports = "<template>\r\n    <nav>\r\n        <h3 class=\"title\">NetAdmin</h3>\r\n        <ul>\r\n            <li repeat.for=\"database of databases\" class=\"${$parent.selected === database ? 'active' : ''}\">\r\n                <a click.delegate=\"$parent.click(database)\">\r\n                    <i class=\"fa fa-database\" aria-hidden=\"true\"></i>\r\n                    ${database.name}\r\n                </a>\r\n                <ul class=\"hidden\">\r\n                    <li repeat.for=\"table of database.tables\">\r\n                        <i class=\"fa fa-table\" aria-hidden=\"true\"></i>\r\n                        ${table}\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n        </ul>\r\n    </nav>\r\n</template>"; });
define('text!styles/default.css', ['module'], function(module) { module.exports = ".reset, html,\nbody,\nul,\nol, nav .title {\n  margin: 0;\n  padding: 0; }\n\nhtml {\n  height: 100%; }\n\nbody {\n  font: 100% Helvetica, sans-serif;\n  color: #333;\n  background: #5C258D;\n  /* fallback for old browsers */\n  background: -webkit-linear-gradient(to left, #5C258D, #4389A2);\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to left, #5C258D, #4389A2);\n  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ }\n\n*, *:before, *:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nnav {\n  display: block;\n  position: fixed;\n  overflow: auto;\n  height: 100%;\n  width: 16.66667%;\n  background-color: rgba(0, 0, 0, 0.5); }\n  nav .title {\n    padding: 12px;\n    color: #eee;\n    border-bottom: 2px solid rgba(26, 26, 26, 0.5); }\n  nav ul {\n    list-style: none; }\n  nav li a {\n    display: block;\n    padding: 10px 12px;\n    text-decoration: none;\n    color: #eee;\n    cursor: pointer; }\n    nav li a::visited {\n      color: #eee; }\n  nav li.active {\n    background-color: rgba(0, 0, 0, 0.4); }\n  nav li:hover:not(.active) {\n    background-color: rgba(0, 0, 0, 0.3); }\n  nav li:not(.active) > ul {\n    max-height: 0;\n    overflow: hidden;\n    transition: max-height 0.5s cubic-bezier(0, 1.05, 0, 1); }\n  nav li > ul {\n    color: #eee;\n    max-height: 1000px;\n    transition: max-height 2s linear; }\n    nav li > ul > li {\n      padding: 6px; }\n\n.content {\n  margin-left: 16.66667%;\n  padding: 16px 16px; }\n\nfooter {\n  position: absolute;\n  bottom: 0;\n  left: 16.66667%;\n  right: 0;\n  padding: 16px;\n  background-color: rgba(0, 0, 0, 0.15);\n  color: #aaa;\n  font-size: 12px;\n  text-align: center; }\n\nform input:not([type=submit]), form input:not([type=file]) {\n  padding: 1em 1em 1em 2.5em;\n  border-radius: 1em;\n  border: 1px solid #aaa;\n  outline: 0;\n  transition: all 0.25s ease; }\n\nform input.red {\n  border-color: red; }\n\nform input.blue {\n  border-color: cornflowerblue; }\n\nform input:focus {\n  border-color: #51cbee;\n  box-shadow: 0 0 5px #51cbee; }\n\nform fieldset {\n  padding: 12px;\n  position: relative;\n  border: 0; }\n  form fieldset i {\n    position: absolute;\n    left: 24px;\n    top: 24px;\n    color: gray; }\n\nform[role=sign-in] {\n  display: block;\n  margin: auto; }\n\nbutton {\n  padding: 12px;\n  border-radius: 1em;\n  outline: 0;\n  border: 1px solid #5A5A5A;\n  background-color: transparent;\n  cursor: pointer;\n  transition: all 0.25s ease-out;\n  color: #5A5A5A; }\n  button:hover {\n    color: #fff;\n    background-color: #5A5A5A; }\n  button.blue {\n    color: #00A1E4;\n    border-color: #00A1E4; }\n    button.blue:hover {\n      color: #fff;\n      background-color: #00A1E4; }\n\n.full-width {\n  width: 100%; }\n\n.one-third, form[role=sign-in] {\n  width: 33.33%; }\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n    <a route-href=\"route: login-page\">Login</a>\r\n</template>"; });
define('text!login-page.html', ['module'], function(module) { module.exports = "<template>\r\n    <form role=\"sign-in\">\r\n        <fieldset>\r\n            <i class=\"fa fa-user fa-fw\" aria-hidden=\"true\"></i>\r\n            <input type=\"text\" class=\"blue full-width\" placeholder=\"Login\" value.bind=\"model.username\">\r\n        </fieldset>\r\n        <fieldset>\r\n            <i class=\"fa fa-key fa-fw\" aria-hidden=\"true\"></i>\r\n            <input type=\"password\" class=\"blue full-width\" placeholder=\"Password\" value.bind=\"model.password\">\r\n        </fieldset>\r\n        <fieldset>\r\n            <button type=\"submit\" class=\"blue full-width\" click.delegate=\"signIn()\">Sign in</button>\r\n        </fieldset>\r\n    </form>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map