import { Request, Response } from 'express';
import Message from '../models/Message';

export class MessageController {
    private message = Message;

    public async getAll(req: Request, res: Response) {
        const messages = await this.message.find({});
        return res.status(200).send(messages);
    }

    public async getOne(req: Request, res: Response) {
        const message = await this.message.findById(req.params.id);
        return res.status(200).send(message);
    }

    public async addOne(req: Request, res: Response) {
        let message = {
            text: req.body.text,
            //TODO
            // userId:
        };

        message = await this.message.create(message);

        return res.send(message);
    }

    public async deleteOne(req: Request, res: Response) {
        const message = await this.message.findByIdAndRemove(req.params.messageId);
        return res.send(message);
    }
}

export const messageController = new MessageController();
