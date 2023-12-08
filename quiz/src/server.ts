import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.json({message: 'deu bom '}));

app.listen(3000, () => console.log('rodando...'));


