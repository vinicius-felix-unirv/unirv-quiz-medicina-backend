import 'express-async-errors';
import 'reflect-metadata';
import Express from 'express';
import routes from './routes/routes';
import { errorMiddleware } from './middlewares/error';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDocument from './swagger-config/swagger.json';
// import { isAuthenticated } from './middlewares/isAuthenticated';

dotenv.config();

const app = Express();

app.use(Express.json());

app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

app.listen(3000, () => console.log('rodando...'));


