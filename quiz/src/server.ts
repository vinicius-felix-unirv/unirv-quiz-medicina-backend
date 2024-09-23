import 'express-async-errors';
import 'reflect-metadata';
import Express from 'express';
import routes from './routes/routes';
import { errorMiddleware } from './middlewares/error';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDocument from './swagger-config/swagger.json';
import cors from 'cors';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const app = Express();

app.use((req: Request, res: Response, next: NextFunction) => {
    next();
}, cors({
    maxAge: 84600,
    origin: '*'
}));

app.use(Express.json());

app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

app.listen(3000, () => console.log('rodando...'));


