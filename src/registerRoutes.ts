import 'reflect-metadata';
import {Express}  from "express";
import { CONTROLLER_KEY } from './decorators/controller.decoder';
import { ROUTE_KEY } from './decorators/route.decoder';
interface RouteDefinition {
    method: string;
    path: string;
    handlerName: string;
  }

  export function registerRoutes(app: Express, controllers: Function[]){
    for (const controllerClass of controllers){
        const basePath: string = Reflect.getMetadata(CONTROLLER_KEY, controllerClass);
        const routes: RouteDefinition[] = Reflect.getMetadata(ROUTE_KEY, controllerClass) || [];

        const controllerInstance = new (controllerClass as any)();

        for (const route of routes){
            const fullPath = basePath + route.path;

            (app as any)[route.method](
                fullPath,
                controllerInstance[route.handlerName].bind(controllerInstance));

            console.log(`[route registerged] ${route.method.toUpperCase()} ${fullPath}`)
        }
    }
  }