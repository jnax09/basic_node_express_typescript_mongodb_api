import * as express from 'express';
import { messageController } from './../controllers/MessageController';
import RequestWithContext from '../interfaces/RequestWithContext';

class MessageRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', (req: RequestWithContext, res: express.Response) =>
            messageController.getAll(req, res),
        );

        this.router.get('/:messageId', (req: RequestWithContext, res: express.Response) =>
            messageController.getOne(req, res),
        );

        this.router.post('/', (req: RequestWithContext, res: express.Response) =>
            messageController.addOne(req, res),
        );

        this.router.delete(
            '/:messageId',
            (req: RequestWithContext, res: express.Response) =>
                messageController.deleteOne(req, res),
        );
    }
}

export const messageRoutes = new MessageRoutes().router;
