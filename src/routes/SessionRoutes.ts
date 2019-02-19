import * as express from 'express';
import { sessionController } from './../controllers/SessionController';
import RequestWithContext from '../interfaces/RequestWithContext';

class SessionRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', (req: RequestWithContext, res: express.Response) =>
            sessionController.get(req, res),
        );
    }
}

export const sessionRoutes = new SessionRoutes().router;
