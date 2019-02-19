import { Request, Response } from 'express';
import RequestWithContext from '../interfaces/RequestWithContext';

export class SessionController {
    public get(req: RequestWithContext, res: Response) {
        return res.status(200).send(req.context.models.users[req.context.me.id]);
    }
}

export const sessionController = new SessionController();
