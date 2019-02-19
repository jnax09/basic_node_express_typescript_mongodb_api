import * as express from 'express';
import { userController } from './../controllers/UserController';
import RequestWithContext from '../interfaces/RequestWithContext';

class UserRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', (req: RequestWithContext, res: express.Response) =>
            userController.getAll(req, res),
        );

        this.router.get('/:userId', (req: RequestWithContext, res: express.Response) =>
            userController.getOne(req, res),
        );
    }
}

export const userRoutes = new UserRoutes().router;
