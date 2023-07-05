import { Router, Request, Response, NextFunction } from 'express';

declare global {
    interface Controller {
        path: string;
        router: Router;
    }
    interface IAuthMiddleware {
        (req: Request, res: Response, next: NextFunction): void;
    }
    interface IErrorMiddleware {
        (err: any, req: Request, res: Response, next: NextFunction): void;
    }
    type Middleware = IAuthMiddleware | IErrorMiddleware;
    interface IRouteOptions {
        method: 'get' | 'post' | 'put' | 'delete';
        path: string;
        middleware: Middleware[];
        handler: (req: Request, res: Response) => void;
    }
}
