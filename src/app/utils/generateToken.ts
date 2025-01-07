import jwt from 'jsonwebtoken';
import { TJwtPayloadData } from '../modules/user/user.interface';

const generateToken = (
    payload: TJwtPayloadData,
    accessToken: string,
    expiresIn: string
) => {
    return jwt.sign(payload, accessToken, {
        expiresIn,
    });
};

export default generateToken;
