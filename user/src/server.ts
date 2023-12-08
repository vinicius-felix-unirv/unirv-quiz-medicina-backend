import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.json({message: 'deu bom de novo'}));

app.listen(3002, () => console.log('rodando...'));


