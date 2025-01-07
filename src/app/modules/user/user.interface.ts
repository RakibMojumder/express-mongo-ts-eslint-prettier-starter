import { Types } from 'mongoose';

export interface TUser {
    name: string;
    email: string;
    image: string;
    password: string;
}

export interface TJwtPayloadData {
    id: Types.ObjectId;
    email: string;
}
