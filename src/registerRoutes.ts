import 'reflect-metadata';
import {Express}  from "express";
import { CONTROLLER_KEY } from './decorators/controller.decoder';
import { ROUTE_KEY } from './decorators/route.decoder';
import { MIDDLEWARE_KEY } from './decorators/middleware.decoder';
interface RouteDefinition {
    method: string;
    path: string;
    handlerName: string;
  }

  export function registerRoutes(app: Express, controllers: Function[]){
    
    // for-of loop
    for (const controllerClass of controllers){
        const basePath: string = Reflect.getMetadata(CONTROLLER_KEY, controllerClass);
        const routes: RouteDefinition[] = Reflect.getMetadata(ROUTE_KEY, controllerClass) || [];
        const controllerInstance = new (controllerClass as any)();
        
        for (const route of routes){
            const fullPath = basePath + route.path;

            const middlewareFns = Reflect.getMetadata(
                MIDDLEWARE_KEY,
                controllerInstance,
                route.handlerName
              ) || [];
        
            (app as any)[route.method](
                fullPath,...middlewareFns,
                controllerInstance[route.handlerName].bind(controllerInstance));

            console.log(`[route registerged] ${route.method.toUpperCase()} ${fullPath}`)
        }
    }
  }