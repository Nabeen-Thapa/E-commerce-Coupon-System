import "reflect-metadata";

export const MIDDLEWARE_KEY = Symbol("middleware");

export function UseMiddleware(...middlewareFns: Function[]) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(MIDDLEWARE_KEY, middlewareFns, target, propertyKey);
  };
}
