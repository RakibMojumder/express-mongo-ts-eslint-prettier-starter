import { Router } from 'express';
import userControllers from './user.controller';

const route = Router();

route.post('/signup', userControllers.createUser);
route.post('/login', userControllers.loginUser);

const userRoute = route;

export default userRoute;
