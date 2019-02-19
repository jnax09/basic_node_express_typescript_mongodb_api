import * as mongoose from 'mongoose';
import Message from '../interfaces/Message';

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model<Message & mongoose.Document>('Message', messageSchema);

export default Message;
