import 'reflect-metadata';
import Express from 'express';
import routes from './routes/routes';

const app = Express();

app.use(Express.json());
app.use(routes);

app.get('/', (req, res) => res.json({message: 'deu bom '}));

app.listen(3000, () => console.log('rodando...'));


