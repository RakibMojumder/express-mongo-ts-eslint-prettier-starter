import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('hello from api');
});

app.use('/api/v1', router);

export default app;
