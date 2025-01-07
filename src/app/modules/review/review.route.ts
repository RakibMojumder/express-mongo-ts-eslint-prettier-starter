import { Router } from 'express';
import reviewControllers from './review.controller';

const route = Router();

route.get('/', reviewControllers.getAllReview);
route.post('/add-review', reviewControllers.addReview);

const reviewRoute = route;

export default reviewRoute;
