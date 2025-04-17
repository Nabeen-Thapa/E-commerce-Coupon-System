"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
require("reflect-metadata");
var controller_decoder_1 = require("./decorators/controller.decoder");
var route_decoder_1 = require("./decorators/route.decoder");
function registerRoutes(app, controllers) {
    for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
        var controllerClass = controllers_1[_i];
        var basePath = Reflect.getMetadata(controller_decoder_1.CONTROLLER_KEY, controllerClass);
        var routes = Reflect.getMetadata(route_decoder_1.ROUTE_KEY, controllerClass) || [];
        var controllerInstance = new controllerClass();
        for (var _a = 0, routes_1 = routes; _a < routes_1.length; _a++) {
            var route = routes_1[_a];
            var fullPath = basePath + route.path;
            app[route.method](fullPath, controllerInstance[route.handlerName].bind(controllerInstance));
            console.log("[route registerged] ".concat(route.method.toUpperCase(), " ").concat(fullPath));
        }
    }
}
