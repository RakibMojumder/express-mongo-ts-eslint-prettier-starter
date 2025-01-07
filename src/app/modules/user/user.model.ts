import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        image: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = model<TUser>('User', userSchema);
export default User;
