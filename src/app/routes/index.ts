import { Router } from 'express';
import userRoute from '../modules/user/user.route';
import projectRoute from '../modules/project/project.route';
import reviewRoute from '../modules/review/review.route';
const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/project',
        route: projectRoute,
    },
    {
        path: '/review',
        route: reviewRoute,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
