import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { mainRoutes, messageRoutes, userRoutes, sessionRoutes } from './routes';
import models, { connectDb } from './models';
import RequestWithContext from './interfaces/RequestWithContext';
import createUsersWithMessages from './seedDatabase';

class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/node_express_server_rest_api';
    // Initialize Database on Express start
    public eraseDatabaseOnSync: boolean = true;

    constructor() {
        this.app = express();

        this.config();
        this.mongoSetup();
    }

    private config(): void {
        // body-parser extracts the entire body portion of an incoming request stream
        // and makes it accessible on req.body

        // Parses the text as JSON and exposes the resulting object on req.body

        //support application/json type post data
        this.app.use(bodyParser.json());

        //Parses the text as URL encoded data
        //(which is how browsers tend to send form data from regular forms set to POST)
        //and exposes the resulting object (containing the keys and values) on req.body.

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // middleware that can be used to enable CORS with various options.
        this.app.use(cors());

        // Custom middleware
        this.app.use(
            async (req: RequestWithContext, res: express.Response, next: express.NextFunction) => {
                req.context = {
                    models,
                    me: await models.User.find({ username: 'rwieruch' }),
                };
                next();
            },
        );

        // Routing
        this.app.use('/', mainRoutes);
        this.app.use('/session', sessionRoutes);
        this.app.use('/users', userRoutes);
        this.app.use('/messages', messageRoutes);
    }

    private mongoSetup(): void {
        connectDb().then(async () => {
            if (this.eraseDatabaseOnSync) {
                await Promise.all([models.User.deleteMany({}), models.Message.deleteMany({})]);
                createUsersWithMessages();
            }
        });
    }
}

export default new App().app;
