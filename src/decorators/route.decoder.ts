import "reflect-metadata";

export const ROUTE_KEY = Symbol("routes");

interface routeDefinition {
    method: string;
    path:string;
    handlerName: string;
}

export function Route(method: string, path:string){
    return function(target:any, propertyKey : string){
        const existingRoutes : routeDefinition[]=
        Reflect.getMetadata(ROUTE_KEY, target.constructor)||[];
        existingRoutes.push({
            method,
            path,
            handlerName :propertyKey, 
        });
        Reflect.defineMetadata(ROUTE_KEY, existingRoutes, target.constructor);
    }
}