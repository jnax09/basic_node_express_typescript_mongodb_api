import * as mongoose from 'mongoose';
import User from '../interfaces/User';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
});

userSchema.statics.findByLogin = async function(login: string) {
    let user = await this.findOne({
        username: login,
    });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

// in case a user is deleted
//perform a so called cascade delete for all messages in relation to the user
userSchema.pre('remove', function(next) {
    this.model('Message').deleteMany({ user: this._id }, next);
});

const User = mongoose.model<User & mongoose.Document>('User', userSchema);

export default User;
