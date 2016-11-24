define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.databases = [
                { name: "Database 1", tables: ["Table 1", "Table 2"] },
                { name: "Database 2", tables: ["Table 1", "Table 2"] },
                { name: "Database 3", tables: ["Table 1", "Table 2"] },
                { name: "Database 4", tables: ["Table 1", "Table 2"] },
                { name: "Database 5", tables: ["Table 1", "Table 2"] }
            ];
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'NetAdmin';
            config.map([
                { route: '', moduleId: 'home', title: 'Home' },
                { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('home',["require", "exports"], function (require, exports) {
    "use strict";
    var Home = (function () {
        function Home() {
            this.message = "Home message";
        }
        return Home;
    }());
    exports.Home = Home;
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

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\r\n  <require from=\"./styles/default.css\"></require>\r\n\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-2\" id=\"accordion\" role=\"tablist\">\r\n        <div class=\"card\" repeat.for=\"database of databases\">\r\n          <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse${$index}\" aria-expanded=\"false\" aria-controls=\"collapse${$index}\">\r\n            <div class=\"card-header\" role=\"tab\" id=\"heading${$index}\">\r\n              <div class=\"mb-0\">\r\n                <i class=\"fa fa-database\" aria-hidden=\"true\"></i>\r\n                ${database.name}\r\n              </div>\r\n            </div>\r\n          </a>\r\n\r\n          <div id=\"collapse${$index}\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"heading${$index}\">\r\n            <div class=\"card-block\">\r\n              <p repeat.for=\"table of database.tables\">\r\n                <i class=\"fa fa-table\" aria-hidden=\"true\"></i>\r\n                ${table}\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-md-10\">\r\n        <div class=\"container\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-4\">Contact List Placeholder</div>\r\n            <router-view class=\"col-md-8\"></router-view>\r\n\r\n            <hr />\r\n            <footer>\r\n              <p>&copy; 2016 - Avilox</p>\r\n            </footer>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!styles/default.css', ['module'], function(module) { module.exports = "#accordion {\r\n    padding: 0;\r\n}\r\n\r\n#accordion > .card {\r\n    margin: 0;\r\n}\r\n\r\n#accordion,\r\n#accordion .card-header, \r\n#accordion .card-block {\r\n    background-color: #2d2d2d;\r\n}\r\n\r\n#accordion .card-header,\r\n#accordion .card-block {\r\n    color: #c9c9c9;\r\n}\r\n\r\n#accordion .card > a {\r\n    text-decoration: none;\r\n}\r\n\r\n#accordion .card {\r\n    border: 0;\r\n}\r\n\r\n#accordion .card:hover .card-header {\r\n    background-color: #494949;\r\n    cursor: pointer;\r\n}\r\n\r\n#accordion .card-block {\r\n    padding: 0 0 0 1.5em;\r\n}\r\n\r\n#accordion .card-block p {\r\n    margin: 0;\r\n}"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n    <p>${message}</p>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map