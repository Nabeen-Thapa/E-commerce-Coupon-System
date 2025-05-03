import 'reflect-metadata';
import { Express, Request, Response } from "express";
import { CONTROLLER_KEY } from './decorators/controller.decoder';
import { ROUTE_KEY } from './decorators/route.decoder';
import { MIDDLEWARE_KEY } from './decorators/middleware.decoder';
import { ParamMetadata, ParamType } from './decorators/params/types';

interface RouteDefinition {
  method: string;
  path: string;
  handlerName: string;
}

export function registerRoutes(app: Express, controllers: Function[]) {
  for (const controllerClass of controllers) {
    const basePath: string = Reflect.getMetadata(CONTROLLER_KEY, controllerClass);
    const routes: RouteDefinition[] = Reflect.getMetadata(ROUTE_KEY, controllerClass) || [];
    const controllerInstance = new (controllerClass as any)();

    for (const route of routes) {
      const fullPath = basePath + route.path;

      const middlewareFns = Reflect.getMetadata(
        MIDDLEWARE_KEY,
        controllerInstance,
        route.handlerName
      ) || [];

      const handler = async (req: Request, res: Response) => {
        const paramMeta: ParamMetadata[] =
          Reflect.getMetadata("custom:params", controllerInstance, route.handlerName) || [];

        const args: any[] = [];

        for (const meta of paramMeta) {
          switch (meta.type) {
            case ParamType.BODY:
              args[meta.index] = meta.key ? req.body?.[meta.key] : req.body;
              break;

            case ParamType.PARAM:
              args[meta.index] = meta.key ? req.params?.[meta.key] : req.params;
              break;

            case ParamType.HEADER:
              args[meta.index] = meta.key ? req.headers?.[meta.key] : req.headers;
              break;

            case ParamType.QUERY:
              args[meta.index] = meta.key ? req.query?.[meta.key] : req.query;
              break;

            case ParamType.REQUEST:
              args[meta.index] = req;
              break;

            case ParamType.REAPONSE:
              args[meta.index] = res;
              break;
          }
        }

        try {
          await controllerInstance[route.handlerName](...args);
        } catch (error) {
          console.error(`Error in ${route.handlerName}:`, error);
          res.status(500).json({ success: false, message: 'Internal server error' });
        }
      };

      (app as any)[route.method](fullPath, ...middlewareFns, handler);
      console.log(`[route registered] ${route.method.toUpperCase()} ${fullPath}`);
    }
  }
}
