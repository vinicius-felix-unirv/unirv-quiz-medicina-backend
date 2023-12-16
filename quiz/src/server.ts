import 'express-async-errors';
import 'reflect-metadata';
import Express from 'express';
import routes from './routes/routes';
import { errorMiddleware } from './middlewares/error';

const app = Express();

app.use(Express.json());
app.use(routes);

app.get('/', (req, res) => res.json({message: 'deu bom '}));

app.use(errorMiddleware);
app.listen(3000, () => console.log('rodando...'));


