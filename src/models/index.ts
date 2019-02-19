import * as mongoose from 'mongoose';

import User from './User';
import Message from './Message';

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { User, Message };

export { connectDb };

export default models;
