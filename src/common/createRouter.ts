import { Router } from 'express';

export const createRoutes = (
    authRoutes: Record<string, IRouteOptions>,
    router: Router
): void => {
    Object.values(authRoutes).forEach(
        ({ method, middleware, handler, path }: IRouteOptions) => {
            if (middleware.length) {
                router.route(path)[method](...middleware, handler);
            } else {
                router.route(path)[method](handler);
            }
        }
    );
};
