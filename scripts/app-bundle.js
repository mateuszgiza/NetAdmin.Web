define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.databases = [
                { name: "1", tables: ["1", "2"] },
                { name: "2", tables: ["1", "2"] },
                { name: "3", tables: ["1", "2"] },
                { name: "4", tables: ["1", "2"] },
                { name: "5", tables: ["1", "2"] }
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

define('text!styles/default.css', ['module'], function(module) { module.exports = ""; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"semantic-ui/semantic.css\"></require>\n  <require from=\"./styles/default.css\"></require>\n\n  <div class=\"ui left fixed inverted vertical visible sidebar menu\">\n    <div class=\"item\">\n      NetAdmin\n    </div>\n    <div class=\"item\" id=\"menu-databases\">\n      <!--@await Component.InvokeAsync(\"DatabaseMenu\")-->\n      <div class=\"ui inverted accordion\">\n        <div repeat.for=\"database of databases\">\n          <div class=\"title\" id=\"db${$index}\">\n            <i class=\"database icon\"></i> ${database.name}\n          </div>\n          <div class=\"content\">\n            <div class=\"transition hidden\" id=\"tables${$index}\">\n              @*@await Component.InvokeAsync(\"TableMenu\")*@\n            </div>\n          </div>\n\n          <!--<script>\n        $(\"#db-@i\").click(function(){\n        $('#tables-@i').load(\"/Command/GetTablesMenu?database=@database\");\n    });\n    @{ i++; }\n        </script>-->\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"pusher\" id=\"content\">\n\n    <hr />\n    <footer>\n      <p>&copy; 2016 - Avilox</p>\n    </footer>\n  </div>\n  <div>\n    <div class=\"row\">\n      <div class=\"col-md-2 bg-inverse\" id=\"accordion\" role=\"tablist\">\n        <div class=\"card\" repeat.for=\"database of databases\">\n          <div class=\"card-header\" role=\"tab\" id=\"heading${$index}\">\n            <h6 class=\"mb-0\">\n              <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse${$index}\" aria-expanded=\"false\" aria-controls=\"collapse${$index}\">\n            ${database.name}\n          </a>\n            </h6>\n          </div>\n\n          <div id=\"collapse${$index}\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"heading${$index}\">\n            <div class=\"card-block\">\n              <ul>\n                <li repeat.for=\"table of database.tables\">\n                  ${table}\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-10\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\">Contact List Placeholder</div>\n            <router-view class=\"col-md-8\"></router-view>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n    <p>${message}</p>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map