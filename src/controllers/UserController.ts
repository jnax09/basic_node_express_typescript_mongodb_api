import { Request, Response } from 'express';
import RequestWithContext from '../interfaces/RequestWithContext';

export class UserController {
    public getAll(req: RequestWithContext, res: Response) {
        return res.send(Object.values(req.context.models.users));
    }

    public getOne(req: RequestWithContext, res: Response) {
        return req.context.models.users[req.params.userId];
    }
}

export const userController = new UserController();
